import { createdAt, updatedAt } from "@/dist/db/schema/index";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
const key = pgTable("keys", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: varchar("email", { length: 255 }).notNull(),
    publicKey: varchar("public_key", { length: 2048 }).notNull(),
    createdAt: createdAt,
    updatedAt: updatedAt,
});
export default key;
