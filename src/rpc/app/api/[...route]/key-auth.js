import { connectRedis, redis } from "@/config/redis";
import db from "@/db";
import key from "@/db/schema/key";
import { Responses } from "@/utils/responses";
import { zValidator } from "@hono/zod-validator";
import { constants, createVerify, randomBytes } from "crypto";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import jwt from "jsonwebtoken";
import { z } from "zod";
const JWT_SECRET = process.env.JWT_SECRET;
const keyAuthValidator = z.object({
    email: z.string().email("Invalid email format"),
    publicKey: z.string().min(1, "Public key is required"),
});
await connectRedis();
const KeyAuth = new Hono()
    .post("/register", zValidator("json", keyAuthValidator), async (c) => {
    try {
        const { email, publicKey } = c.req.valid("json");
        const existingUser = await db
            .select()
            .from(key)
            .where(eq(key.email, email));
        if (existingUser.length > 0) {
            return c.json(Responses.alreadyExists("Email is already registered"), 409);
        }
        const newKey = await db
            .insert(key)
            .values({
            email,
            publicKey,
        })
            .returning({
            id: key.id,
            email: key.email,
        });
        return c.json(Responses.success("Key registered successfully", newKey[0]), 201);
    }
    catch (error) {
        return c.json(Responses.error("Failed to register key", error), 500);
    }
})
    .post("/challenge", zValidator("json", z.object({ email: z.string().email() })), async (c) => {
    try {
        const { email } = c.req.valid("json");
        // Check if user exists
        const user = await db
            .select()
            .from(key)
            .where(eq(key.email, email))
            .limit(1);
        if (user.length === 0) {
            return c.json(Responses.notFound("User not found"), 404);
        }
        // Generate a secure random challenge (32 bytes = 256 bits)
        const challenge = randomBytes(32);
        const challengeBase64 = challenge.toString("base64");
        // Store challenge in Redis with 5-minute expiration
        const challengeKey = `challenge:${email}`;
        await redis.setEx(challengeKey, 300, challengeBase64); // 5 minutes
        return c.json(Responses.success("Challenge generated", {
            challenge: challengeBase64,
            expiresIn: 300, // seconds
        }), 200);
    }
    catch (error) {
        console.error("Challenge generation error:", error);
        return c.json(Responses.error("Failed to generate challenge", error), 500);
    }
})
    .post("/verify", zValidator("json", z.object({
    email: z.string().email(),
    signature: z.string().min(1, "Signature is required"),
})), async (c) => {
    try {
        const { email, signature } = c.req.valid("json");
        // Check if user exists
        const user = await db
            .select()
            .from(key)
            .where(eq(key.email, email))
            .limit(1);
        if (user.length === 0) {
            return c.json(Responses.notFound("User not found"), 404);
        }
        // Retrieve the challenge from Redis
        const challengeKey = `challenge:${email}`;
        const storedChallenge = await redis.get(challengeKey);
        if (!storedChallenge) {
            return c.json(Responses.notFound("Challenge not found or expired. Please request a new challenge."), 404);
        }
        try {
            // Verify the signature using Node.js crypto
            const publicKeyPem = user[0].publicKey;
            const verifier = createVerify("RSA-PSS");
            verifier.update(storedChallenge, "base64"); // Update with base64 encoding
            verifier.end();
            const isValid = verifier.verify({
                key: publicKeyPem,
                padding: constants.RSA_PKCS1_PSS_PADDING,
                saltLength: 32, // PSS salt length
            }, signature, "base64");
            if (!isValid) {
                return c.json(Responses.unauthorized("Invalid signature"), 401);
            }
            // Delete the challenge after successful verification
            await redis.del(challengeKey);
            // Generate JWT token
            const tokenData = {
                email: user[0].email,
                id: user[0].id,
                iat: Math.floor(Date.now() / 1000),
            };
            const token = await jwt.sign(tokenData, JWT_SECRET, {
                expiresIn: "5y",
            });
            return c.json(Responses.success("Authentication successful", {
                token,
                user: {
                    id: user[0].id,
                    email: user[0].email,
                },
            }), 200);
        }
        catch (verificationError) {
            console.error("Signature verification error:", verificationError);
            return c.json(Responses.unauthorized("Signature verification failed"), 401);
        }
    }
    catch (error) {
        console.error("Verification error:", error);
        return c.json(Responses.error("Failed to verify signature", error), 500);
    }
})
    .get("/protected", async (c) => {
    try {
        const authHeader = c.req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return c.json(Responses.unauthorized("Missing or invalid token"), 401);
        }
        const token = authHeader.substring(7);
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            return c.json(Responses.success("Token is valid", decoded), 200);
        }
        catch (err) {
            return c.json(Responses.unauthorized("Invalid or expired token"), 401);
        }
    }
    catch (error) {
        return c.json(Responses.error("Failed to verify token", error), 500);
    }
});
export default KeyAuth;
