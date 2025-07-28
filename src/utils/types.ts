// const expenses: {
//     id: string;
//     amount: string;
//     description: string;
//     transactionType: "deposit" | "withdrawal" | "expense" | "goal" | "transfer" | "send" | "receive";
//     userId: string;
//     accountId: string | null;
//     referenceId: string | null;
//     referenceType: string | null;
//     createdAt: string;
//     updatedAt

export type Expense = {
  id: string;
  amount: number;
  description: string;
  transactionType: 'deposit' | 'withdrawal' | 'expense' | 'goal' | 'transfer' | 'send' | 'receive';
  userId: string;
  accountId: string | null;
  referenceId: string | null;
  referenceType: string | null;
  createdAt: string;
  updatedAt: string;
};
