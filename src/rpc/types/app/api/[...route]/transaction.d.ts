declare const transaction: import("hono/hono-base").HonoBase<import("hono/types").BlankEnv, {
    "/": {
        $get: {
            input: {};
            output: {
                transactions: {
                    id: string;
                    amount: string;
                    description: string;
                    transactionType: "deposit" | "withdrawal" | "expense" | "goal" | "transfer" | "send" | "receive";
                    userId: string;
                    accountId: string | null;
                    referenceId: string | null;
                    referenceType: string | null;
                    createdAt: string;
                    updatedAt: string;
                }[];
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
} & {
    "/": {
        $post: {
            input: {};
            output: {
                message: string;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
}, "/">;
export default transaction;
