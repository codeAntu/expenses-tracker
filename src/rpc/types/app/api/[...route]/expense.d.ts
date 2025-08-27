declare const expense: import("hono/hono-base").HonoBase<import("hono/types").BlankEnv, {
    "/": {
        $get: {
            input: {};
            output: never;
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        } | {
            input: {};
            output: {
                success: boolean;
                statusCode: number;
                message: string;
                data: {
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
                }[] | null;
                error: string | null;
                timestamp: string;
            };
            outputFormat: "json";
            status: 200;
        };
    };
} & {
    "/all": {
        $get: {
            input: {};
            output: never;
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        } | {
            input: {};
            output: {
                success: boolean;
                statusCode: number;
                message: string;
                data: {
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
                }[] | null;
                error: string | null;
                timestamp: string;
            };
            outputFormat: "json";
            status: 200;
        };
    };
} & {
    "/categories": {
        $get: {
            input: {};
            output: never;
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        } | {
            input: {};
            output: {
                success: boolean;
                statusCode: number;
                message: string;
                data: {
                    id: string;
                    name: string;
                    description: string | null;
                    totalExpense: string;
                    icon: string;
                    color: string;
                    userId: string;
                    accountId: string | null;
                    createdAt: string;
                    updatedAt: string;
                }[] | null;
                error: string | null;
                timestamp: string;
            };
            outputFormat: "json";
            status: 200;
        };
    };
} & {
    "/categoriesExpenses": {
        $get: {
            input: {};
            output: never;
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        } | {
            input: {};
            output: {
                success: boolean;
                statusCode: number;
                message: string;
                data: {
                    categoryId: string | null;
                }[] | null;
                error: string | null;
                timestamp: string;
            };
            outputFormat: "json";
            status: 200;
        };
    };
} & {
    "categories/:id": {
        $get: {
            input: {
                param: {
                    id: string;
                };
            };
            output: never;
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        } | {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                success: boolean;
                statusCode: number;
                message: string;
                data: {
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
                }[] | null;
                error: string | null;
                timestamp: string;
            };
            outputFormat: "json";
            status: 200;
        };
    };
} & {
    "/expense": {
        $post: {
            input: {
                json: {
                    amount: number;
                    description?: string | undefined;
                    accountId?: string | undefined;
                    referenceId?: string | undefined;
                    categoryId?: string | undefined;
                };
            };
            output: never;
            outputFormat: "json";
            status: 500;
        } | {
            input: {
                json: {
                    amount: number;
                    description?: string | undefined;
                    accountId?: string | undefined;
                    referenceId?: string | undefined;
                    categoryId?: string | undefined;
                };
            };
            output: {
                success: boolean;
                statusCode: number;
                message: string;
                data: {
                    id: string;
                    description: string;
                    createdAt: string;
                    updatedAt: string;
                    userId: string;
                    accountId: string | null;
                    amount: string;
                    transactionType: "deposit" | "withdrawal" | "expense" | "goal" | "transfer" | "send" | "receive";
                    referenceId: string | null;
                    referenceType: string | null;
                } | null;
                error: string | null;
                timestamp: string;
            };
            outputFormat: "json";
            status: 201;
        };
    };
} & {
    "/:id": {
        $delete: {
            input: {
                param: {
                    id: string;
                };
            };
            output: never;
            outputFormat: "json";
            status: 500;
        } | {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                success: boolean;
                statusCode: number;
                message: string;
                data: {
                    id: string;
                    description: string;
                    createdAt: string;
                    updatedAt: string;
                    userId: string;
                    accountId: string | null;
                    amount: string;
                    transactionType: "deposit" | "withdrawal" | "expense" | "goal" | "transfer" | "send" | "receive";
                    referenceId: string | null;
                    referenceType: string | null;
                } | null;
                error: string | null;
                timestamp: string;
            };
            outputFormat: "json";
            status: 200;
        };
    };
} & {
    "/categories": {
        $post: {
            input: {
                json: {
                    name: string;
                    description?: string | undefined;
                    icon?: string | undefined;
                    color?: string | undefined;
                    accountId?: string | undefined;
                };
            };
            output: never;
            outputFormat: "json";
            status: 500;
        } | {
            input: {
                json: {
                    name: string;
                    description?: string | undefined;
                    icon?: string | undefined;
                    color?: string | undefined;
                    accountId?: string | undefined;
                };
            };
            output: {
                success: boolean;
                statusCode: number;
                message: string;
                data: {
                    id: string;
                    name: string;
                    description: string | null;
                    icon: string;
                    color: string;
                    createdAt: string;
                    updatedAt: string;
                    userId: string;
                    totalExpense: string;
                    accountId: string | null;
                } | null;
                error: string | null;
                timestamp: string;
            };
            outputFormat: "json";
            status: 201;
        };
    };
} & {
    "/categories/:id": {
        $delete: {
            input: {
                param: {
                    id: string;
                };
            };
            output: never;
            outputFormat: "json";
            status: 500;
        } | {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                success: boolean;
                statusCode: number;
                message: string;
                data: {
                    id: string;
                    name: string;
                    description: string | null;
                    icon: string;
                    color: string;
                    createdAt: string;
                    updatedAt: string;
                    userId: string;
                    totalExpense: string;
                    accountId: string | null;
                } | null;
                error: string | null;
                timestamp: string;
            };
            outputFormat: "json";
            status: 200;
        };
    };
} & {
    "/categories/:id/expense": {
        $post: {
            input: {
                json: {
                    amount: number;
                    description?: string | undefined;
                    accountId?: string | undefined;
                    referenceId?: string | undefined;
                    categoryId?: string | undefined;
                };
            } & {
                param: {
                    id: string;
                };
            };
            output: never;
            outputFormat: "json";
            status: 500;
        } | {
            input: {
                json: {
                    amount: number;
                    description?: string | undefined;
                    accountId?: string | undefined;
                    referenceId?: string | undefined;
                    categoryId?: string | undefined;
                };
            } & {
                param: {
                    id: string;
                };
            };
            output: {
                success: boolean;
                statusCode: number;
                message: string;
                data: {
                    then: {};
                    catch: {};
                    finally: {};
                } | null;
                error: string | null;
                timestamp: string;
            };
            outputFormat: "json";
            status: 201;
        };
    };
} & {
    "/by-account/:accountId": {
        $get: {
            input: {
                param: {
                    accountId: string;
                };
            };
            output: never;
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        } | {
            input: {
                param: {
                    accountId: string;
                };
            };
            output: {
                success: boolean;
                statusCode: number;
                message: string;
                data: {
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
                }[] | null;
                error: string | null;
                timestamp: string;
            };
            outputFormat: "json";
            status: 200;
        };
    };
}, "/">;
export default expense;
