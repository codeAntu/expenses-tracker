import { z } from "zod";
export declare const testValidator: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    age: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    age: string;
}, {
    name: string;
    email: string;
    age: string;
}>;
export declare const user: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    age: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    age: string;
}, {
    name: string;
    email: string;
    age: string;
}>;
export declare const auth: z.ZodObject<{
    idToken: z.ZodString;
}, "strip", z.ZodTypeAny, {
    idToken: string;
}, {
    idToken: string;
}>;
