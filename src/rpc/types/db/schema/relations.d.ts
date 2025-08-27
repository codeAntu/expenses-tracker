export declare const userRelations: import("drizzle-orm").Relations<"users", {
    accounts: import("drizzle-orm").Many<"accounts">;
    transactions: import("drizzle-orm").Many<"transaction">;
    expenseCategories: import("drizzle-orm").Many<"expense_categories">;
    goals: import("drizzle-orm").Many<"goals">;
    transfers: import("drizzle-orm").Many<"transfers">;
    payees: import("drizzle-orm").Many<"payees">;
}>;
export declare const accountRelations: import("drizzle-orm").Relations<"accounts", {
    user: import("drizzle-orm").One<"users", true>;
    transactions: import("drizzle-orm").Many<"transaction">;
    transfersFrom: import("drizzle-orm").Many<"transfers">;
    transfersTo: import("drizzle-orm").Many<"transfers">;
    payees: import("drizzle-orm").Many<"payees">;
    goals: import("drizzle-orm").Many<"goals">;
}>;
export declare const transactionRelations: import("drizzle-orm").Relations<"transaction", {
    user: import("drizzle-orm").One<"users", true>;
    account: import("drizzle-orm").One<"accounts", false>;
}>;
export declare const expenseCategoryRelations: import("drizzle-orm").Relations<"expense_categories", {
    user: import("drizzle-orm").One<"users", true>;
}>;
export declare const goalRelations: import("drizzle-orm").Relations<"goals", {
    user: import("drizzle-orm").One<"users", true>;
    account: import("drizzle-orm").One<"accounts", false>;
}>;
export declare const transferRelations: import("drizzle-orm").Relations<"transfers", {
    user: import("drizzle-orm").One<"users", true>;
    fromAccount: import("drizzle-orm").One<"accounts", false>;
    toAccount: import("drizzle-orm").One<"accounts", false>;
}>;
export declare const payeeRelations: import("drizzle-orm").Relations<"payees", {
    user: import("drizzle-orm").One<"users", true>;
    account: import("drizzle-orm").One<"accounts", false>;
}>;
