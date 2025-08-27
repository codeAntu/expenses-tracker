export declare function getExpensesByAccountId(userId: string, accountId: string): Promise<{
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
