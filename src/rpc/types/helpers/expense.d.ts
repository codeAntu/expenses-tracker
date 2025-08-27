import { z } from "zod";
export declare const createExpenseValidator: z.ZodObject<{
    amount: z.ZodNumber;
    description: z.ZodOptional<z.ZodString>;
    referenceId: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodOptional<z.ZodString>;
    accountId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    amount: number;
    description?: string | undefined;
    accountId?: string | undefined;
    referenceId?: string | undefined;
    categoryId?: string | undefined;
}, {
    amount: number;
    description?: string | undefined;
    accountId?: string | undefined;
    referenceId?: string | undefined;
    categoryId?: string | undefined;
}>;
export declare const createExpenseCategoryValidator: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    icon: z.ZodOptional<z.ZodString>;
    color: z.ZodOptional<z.ZodString>;
    accountId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    description?: string | undefined;
    icon?: string | undefined;
    color?: string | undefined;
    accountId?: string | undefined;
}, {
    name: string;
    description?: string | undefined;
    icon?: string | undefined;
    color?: string | undefined;
    accountId?: string | undefined;
}>;
export type CreateExpense = z.infer<typeof createExpenseValidator>;
export declare function getAllAExpenses(userId: string): Promise<{
    id: string;
    amount: string;
    description: string;
    transactionType: "deposit" | "withdrawal" | "expense" | "goal" | "transfer" | "send" | "receive";
    userId: string;
    accountId: string | null;
    referenceId: string | null;
    referenceType: string | null;
    createdAt: Date;
    updatedAt: Date;
}[]>;
export declare function getExpenses(userId: string): Promise<{
    id: string;
    amount: string;
    description: string;
    transactionType: "deposit" | "withdrawal" | "expense" | "goal" | "transfer" | "send" | "receive";
    userId: string;
    accountId: string | null;
    referenceId: string | null;
    referenceType: string | null;
    createdAt: Date;
    updatedAt: Date;
}[]>;
export declare function getExpenseCategories(userId: string): Promise<{
    id: string;
    name: string;
    description: string | null;
    totalExpense: string;
    icon: string;
    color: string;
    userId: string;
    accountId: string | null;
    createdAt: Date;
    updatedAt: Date;
}[]>;
export declare function getCategoriesExpenses(userId: string): Promise<{
    categoryId: string | null;
}[]>;
export declare function getCategoriesExpensesById(userId: string, categoryId: string): Promise<{
    id: string;
    amount: string;
    description: string;
    transactionType: "deposit" | "withdrawal" | "expense" | "goal" | "transfer" | "send" | "receive";
    userId: string;
    accountId: string | null;
    referenceId: string | null;
    referenceType: string | null;
    createdAt: Date;
    updatedAt: Date;
}[]>;
export declare function createExpense(userId: string, expenseData: CreateExpense): Promise<{
    id: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    accountId: string | null;
    amount: string;
    transactionType: "deposit" | "withdrawal" | "expense" | "goal" | "transfer" | "send" | "receive";
    referenceId: string | null;
    referenceType: string | null;
}>;
export declare function deleteExpense(userId: string, expenseId: string): Promise<{
    id: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    accountId: string | null;
    amount: string;
    transactionType: "deposit" | "withdrawal" | "expense" | "goal" | "transfer" | "send" | "receive";
    referenceId: string | null;
    referenceType: string | null;
}>;
export declare function createExpenseCategory(userId: string, categoryData: z.infer<typeof createExpenseCategoryValidator>): Promise<{
    id: string;
    name: string;
    description: string | null;
    icon: string;
    color: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    totalExpense: string;
    accountId: string | null;
}>;
export declare function deleteExpenseCategory(userId: string, categoryId: string): Promise<{
    id: string;
    name: string;
    description: string | null;
    icon: string;
    color: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    totalExpense: string;
    accountId: string | null;
}>;
export declare function addExpenseToCategory(userId: string, categoryId: string, expenseData: CreateExpense): Promise<{
    id: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    accountId: string | null;
    amount: string;
    transactionType: "deposit" | "withdrawal" | "expense" | "goal" | "transfer" | "send" | "receive";
    referenceId: string | null;
    referenceType: string | null;
}>;
