import { z } from "zod";
export declare const createAccountValidator: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    icon: z.ZodOptional<z.ZodString>;
    color: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title: string;
    description?: string | undefined;
    icon?: string | undefined;
    color?: string | undefined;
}, {
    title: string;
    description?: string | undefined;
    icon?: string | undefined;
    color?: string | undefined;
}>;
export declare const withdrawDepositValidator: z.ZodObject<{
    amount: z.ZodNumber;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    amount: number;
    description?: string | undefined;
}, {
    amount: number;
    description?: string | undefined;
}>;
type CreateAccount = z.infer<typeof createAccountValidator>;
export declare function createAccount(userId: string, data: CreateAccount): Promise<{
    id: string;
    title: string;
    description: string | null;
    icon: string;
    color: string;
    createdAt: Date;
    updatedAt: Date;
    balance: string;
    userId: string;
}>;
export declare function updateAccount(userId: string, accountId: string, data: Partial<CreateAccount>): Promise<{
    id: string;
    title: string;
    description: string | null;
    balance: string;
    icon: string;
    color: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function deleteAccount(userId: string, accountId: string): Promise<{
    id: string;
    title: string;
    description: string | null;
    icon: string;
    color: string;
    createdAt: Date;
    updatedAt: Date;
    balance: string;
    userId: string;
}>;
export declare function getAllAccounts(userId: string): Promise<{
    id: string;
    title: string;
    description: string | null;
    balance: string;
    icon: string;
    color: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}[]>;
export declare function depositToAccount(userId: string, accountId: string, amount: number, description?: string): Promise<{
    id: string;
    title: string;
    description: string | null;
    balance: string;
    icon: string;
    color: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function withdrawFromAccount(userId: string, accountId: string, amount: number, description?: string): Promise<{
    id: string;
    title: string;
    description: string | null;
    balance: string;
    icon: string;
    color: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function addAmountToAccount(userId: string, accountId: string, amount: number): Promise<{
    id: string;
    title: string;
    description: string | null;
    balance: string;
    icon: string;
    color: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function deductAmountFromAccount(userId: string, accountId: string, amount: number): Promise<{
    id: string;
    title: string;
    description: string | null;
    balance: string;
    icon: string;
    color: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function getAccountById(userId: string, accountId: string): Promise<{
    id: string;
    title: string;
    description: string | null;
    balance: string;
    icon: string;
    color: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export {};
