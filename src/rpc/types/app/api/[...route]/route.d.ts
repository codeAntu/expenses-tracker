export declare const runtime = "nodejs";
declare const app: import("hono/hono-base").HonoBase<import("hono/types").BlankEnv, import("hono/types").BlankSchema, "/api">;
declare const testRoute: import("hono/hono-base").HonoBase<import("hono/types").BlankEnv, import("hono/types").BlankSchema | import("hono/types").MergeSchemaPath<{
    "/": {
        $get: {
            input: {};
            output: {
                message: string;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
} & {
    "/": {
        $post: {
            input: {
                form: {
                    name: string;
                    email: string;
                    age: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
} & {
    "/new": {
        $post: {
            input: {};
            output: {
                message: string;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
}, "/api/test">, "/api">;
declare const authRoute: import("hono/hono-base").HonoBase<import("hono/types").BlankEnv, import("hono/types").BlankSchema | import("hono/types").MergeSchemaPath<{
    "/firebase": {
        $post: {
            input: {
                form: {
                    idToken: string;
                };
            };
            output: {
                success: boolean;
                statusCode: number;
                message: string;
                data: {
                    id: string;
                    name: string;
                    email: string;
                    picture: string;
                    token: string;
                } | null;
                error: string | null;
                timestamp: string;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
}, "/api/auth">, "/api">;
declare const accountRoute: import("hono/hono-base").HonoBase<import("hono/types").BlankEnv, import("hono/types").BlankSchema | import("hono/types").MergeSchemaPath<{
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
                    title: string;
                    description: string | null;
                    balance: string;
                    icon: string;
                    color: string;
                    userId: string;
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
    "/": {
        $post: {
            input: {
                json: {
                    title: string;
                    description?: string | undefined;
                    icon?: string | undefined;
                    color?: string | undefined;
                };
            };
            output: {
                success: boolean;
                statusCode: number;
                message: string;
                data: {
                    id: string;
                    title: string;
                    description: string | null;
                    icon: string;
                    color: string;
                    createdAt: string;
                    updatedAt: string;
                    balance: string;
                    userId: string;
                } | null;
                error: string | null;
                timestamp: string;
            };
            outputFormat: "json";
            status: 201;
        } | {
            input: {
                json: {
                    title: string;
                    description?: string | undefined;
                    icon?: string | undefined;
                    color?: string | undefined;
                };
            };
            output: never;
            outputFormat: "json";
            status: 500;
        };
    };
} & {
    "/:id": {
        $get: {
            input: {
                param: {
                    id: string;
                };
            };
            output: never;
            outputFormat: "json";
            status: 404;
        } | {
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
                    title: string;
                    description: string | null;
                    balance: string;
                    icon: string;
                    color: string;
                    userId: string;
                    createdAt: string;
                    updatedAt: string;
                } | null;
                error: string | null;
                timestamp: string;
            };
            outputFormat: "json";
            status: 200;
        };
    };
} & {
    "/:id": {
        $put: {
            input: {
                json: {
                    title: string;
                    description?: string | undefined;
                    icon?: string | undefined;
                    color?: string | undefined;
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
                    title: string;
                    description?: string | undefined;
                    icon?: string | undefined;
                    color?: string | undefined;
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
                    account: {
                        id: string;
                        title: string;
                        description: string | null;
                        balance: string;
                        icon: string;
                        color: string;
                        userId: string;
                        createdAt: string;
                        updatedAt: string;
                    };
                } | null;
                error: string | null;
                timestamp: string;
            };
            outputFormat: "json";
            status: 200;
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
                    account: {
                        id: string;
                        title: string;
                        description: string | null;
                        icon: string;
                        color: string;
                        createdAt: string;
                        updatedAt: string;
                        balance: string;
                        userId: string;
                    };
                } | null;
                error: string | null;
                timestamp: string;
            };
            outputFormat: "json";
            status: 200;
        };
    };
} & {
    "/:id/deposit": {
        $post: {
            input: {
                json: {
                    amount: number;
                    description?: string | undefined;
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
                    accountId: string;
                    amount: number;
                    account: {
                        id: string;
                        title: string;
                        description: string | null;
                        balance: string;
                        icon: string;
                        color: string;
                        userId: string;
                        createdAt: string;
                        updatedAt: string;
                    };
                } | null;
                error: string | null;
                timestamp: string;
            };
            outputFormat: "json";
            status: 200;
        };
    };
} & {
    "/:id/withdraw": {
        $post: {
            input: {
                json: {
                    amount: number;
                    description?: string | undefined;
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
                    accountId: string;
                    amount: number;
                    account: {
                        id: string;
                        title: string;
                        description: string | null;
                        balance: string;
                        icon: string;
                        color: string;
                        userId: string;
                        createdAt: string;
                        updatedAt: string;
                    };
                } | null;
                error: string | null;
                timestamp: string;
            };
            outputFormat: "json";
            status: 200;
        };
    };
}, "/api/account">, "/api">;
declare const transactionRoute: import("hono/hono-base").HonoBase<import("hono/types").BlankEnv, import("hono/types").BlankSchema | import("hono/types").MergeSchemaPath<{
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
}, "/api/transaction">, "/api">;
declare const expensesRoute: import("hono/hono-base").HonoBase<import("hono/types").BlankEnv, import("hono/types").BlankSchema | import("hono/types").MergeSchemaPath<{
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
}, "/api/expenses">, "/api">;
declare const keyAuthRoute: import("hono/hono-base").HonoBase<import("hono/types").BlankEnv, import("hono/types").BlankSchema | import("hono/types").MergeSchemaPath<{
    "/register": {
        $post: {
            input: {
                json: {
                    email: string;
                    publicKey: string;
                };
            };
            output: never;
            outputFormat: "json";
            status: 500;
        } | {
            input: {
                json: {
                    email: string;
                    publicKey: string;
                };
            };
            output: never;
            outputFormat: "json";
            status: 409;
        } | {
            input: {
                json: {
                    email: string;
                    publicKey: string;
                };
            };
            output: {
                success: boolean;
                statusCode: number;
                message: string;
                data: {
                    id: string;
                    email: string;
                } | null;
                error: string | null;
                timestamp: string;
            };
            outputFormat: "json";
            status: 201;
        };
    };
} & {
    "/challenge": {
        $post: {
            input: {
                json: {
                    email: string;
                };
            };
            output: never;
            outputFormat: "json";
            status: 404;
        } | {
            input: {
                json: {
                    email: string;
                };
            };
            output: never;
            outputFormat: "json";
            status: 500;
        } | {
            input: {
                json: {
                    email: string;
                };
            };
            output: {
                success: boolean;
                statusCode: number;
                message: string;
                data: {
                    challenge: string;
                    expiresIn: number;
                } | null;
                error: string | null;
                timestamp: string;
            };
            outputFormat: "json";
            status: 200;
        };
    };
} & {
    "/verify": {
        $post: {
            input: {
                json: {
                    email: string;
                    signature: string;
                };
            };
            output: never;
            outputFormat: "json";
            status: 401;
        } | {
            input: {
                json: {
                    email: string;
                    signature: string;
                };
            };
            output: never;
            outputFormat: "json";
            status: 404;
        } | {
            input: {
                json: {
                    email: string;
                    signature: string;
                };
            };
            output: never;
            outputFormat: "json";
            status: 500;
        } | {
            input: {
                json: {
                    email: string;
                    signature: string;
                };
            };
            output: {
                success: boolean;
                statusCode: number;
                message: string;
                data: {
                    token: string;
                    user: {
                        id: string;
                        email: string;
                    };
                } | null;
                error: string | null;
                timestamp: string;
            };
            outputFormat: "json";
            status: 200;
        };
    };
} & {
    "/protected": {
        $get: {
            input: {};
            output: never;
            outputFormat: "json";
            status: 500;
        } | {
            input: {};
            output: never;
            outputFormat: "json";
            status: 401;
        } | {
            input: {};
            output: {
                success: boolean;
                statusCode: number;
                message: string;
                data: string | {
                    [x: string]: any;
                    iss?: string | undefined | undefined;
                    sub?: string | undefined | undefined;
                    aud?: string | string[] | undefined | undefined;
                    exp?: number | undefined | undefined;
                    nbf?: number | undefined | undefined;
                    iat?: number | undefined | undefined;
                    jti?: string | undefined | undefined;
                } | null;
                error: string | null;
                timestamp: string;
            };
            outputFormat: "json";
            status: 200;
        };
    };
}, "/api/key-auth">, "/api">;
declare const hello: import("hono/hono-base").HonoBase<import("hono/types").BlankEnv, {
    "/api/hello": {
        $get: {
            input: {};
            output: {
                message: string;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
}, "/api">;
export declare const GET: (req: Request) => Response | Promise<Response>;
export declare const POST: (req: Request) => Response | Promise<Response>;
export declare const DELETE: (req: Request) => Response | Promise<Response>;
export declare const OPTIONS: (req: Request) => Response | Promise<Response>;
export declare const PUT: (req: Request) => Response | Promise<Response>;
export type AppType = typeof app | typeof hello | typeof testRoute | typeof authRoute | typeof transactionRoute | typeof accountRoute | typeof expensesRoute | typeof keyAuthRoute;
export {};
