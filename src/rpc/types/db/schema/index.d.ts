export declare const transactionTypeEnum: import("drizzle-orm/pg-core").PgEnum<["deposit", "withdrawal", "expense", "goal", "transfer", "send", "receive"]>;
export declare const Id: import("drizzle-orm").HasDefault<import("drizzle-orm").IsPrimaryKey<import("drizzle-orm").NotNull<import("drizzle-orm/pg-core").PgUUIDBuilderInitial<"id">>>>;
export declare const Name: import("drizzle-orm").NotNull<import("drizzle-orm/pg-core").PgVarcharBuilderInitial<"title", [string, ...string[]], 255>>;
export declare const Description: import("drizzle-orm/pg-core").PgVarcharBuilderInitial<"description", [string, ...string[]], 255>;
export declare const Email: import("drizzle-orm").NotNull<import("drizzle-orm/pg-core").PgVarcharBuilderInitial<"email", [string, ...string[]], 255>>;
export declare const UserId: import("drizzle-orm").NotNull<import("drizzle-orm/pg-core").PgUUIDBuilderInitial<"user_id">>;
export declare const Picture: import("drizzle-orm").HasDefault<import("drizzle-orm").NotNull<import("drizzle-orm/pg-core").PgVarcharBuilderInitial<"profile_picture", [string, ...string[]], 255>>>;
export declare const Icon: import("drizzle-orm").HasDefault<import("drizzle-orm").NotNull<import("drizzle-orm/pg-core").PgVarcharBuilderInitial<"icon", [string, ...string[]], 255>>>;
export declare const Color: import("drizzle-orm").HasDefault<import("drizzle-orm").NotNull<import("drizzle-orm/pg-core").PgVarcharBuilderInitial<"color", [string, ...string[]], 7>>>;
export declare const createdAt: import("drizzle-orm").HasDefault<import("drizzle-orm").NotNull<import("drizzle-orm/pg-core").PgTimestampBuilderInitial<"created_at">>>;
export declare const updatedAt: import("drizzle-orm").HasDefault<import("drizzle-orm").NotNull<import("drizzle-orm/pg-core").PgTimestampBuilderInitial<"updated_at">>>;
export declare function amount(columnName: string, options?: {
    precision?: number;
    scale?: number;
}): import("drizzle-orm").HasDefault<import("drizzle-orm").NotNull<import("drizzle-orm/pg-core").PgNumericBuilderInitial<string>>>;
