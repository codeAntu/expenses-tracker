import { hc } from "hono/client";
declare const client: {
    api: {
        test: import("hono/client").ClientRequest<{
            $get: {
                input: {};
                output: {
                    message: string;
                };
                outputFormat: "json";
                status: import("hono/utils/http-status").ContentfulStatusCode;
            };
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
        }>;
    };
} & {
    api: {
        test: {
            new: import("hono/client").ClientRequest<{
                $post: {
                    input: {};
                    output: {
                        message: string;
                    };
                    outputFormat: "json";
                    status: import("hono/utils/http-status").ContentfulStatusCode;
                };
            }>;
        };
    };
} & {
    api: {
        auth: {
            firebase: import("hono/client").ClientRequest<{
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
            }>;
        };
    };
} & {
    api: {
        account: import("hono/client").ClientRequest<{
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
        }>;
    };
} & {
    api: {
        account: {
            ":id": import("hono/client").ClientRequest<{
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
            }>;
        };
    };
} & {
    api: {
        account: {
            ":id": {
                deposit: import("hono/client").ClientRequest<{
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
                }>;
            };
        };
    };
} & {
    api: {
        account: {
            ":id": {
                withdraw: import("hono/client").ClientRequest<{
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
                }>;
            };
        };
    };
} & {
    api: {
        transaction: import("hono/client").ClientRequest<{
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
            $post: {
                input: {};
                output: {
                    message: string;
                };
                outputFormat: "json";
                status: import("hono/utils/http-status").ContentfulStatusCode;
            };
        }>;
    };
} & {
    api: {
        expenses: import("hono/client").ClientRequest<{
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
        }>;
    };
} & {
    api: {
        expenses: {
            all: import("hono/client").ClientRequest<{
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
            }>;
        };
    };
} & {
    api: {
        expenses: {
            categories: import("hono/client").ClientRequest<{
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
            }>;
        };
    };
} & {
    api: {
        expenses: {
            categoriesExpenses: import("hono/client").ClientRequest<{
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
            }>;
        };
    };
} & {
    api: {
        expenses: {
            categories: {
                ":id": import("hono/client").ClientRequest<{}>;
            };
        };
    };
} & {
    api: {
        expenses: {
            expense: import("hono/client").ClientRequest<{
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
            }>;
        };
    };
} & {
    api: {
        expenses: {
            ":id": import("hono/client").ClientRequest<{
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
            }>;
        };
    };
} & {
    api: {
        expenses: {
            categories: {
                ":id": {
                    expense: import("hono/client").ClientRequest<{
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
                    }>;
                };
            };
        };
    };
} & {
    api: {
        hello: import("hono/client").ClientRequest<{
            $get: {
                input: {};
                output: {
                    message: string;
                };
                outputFormat: "json";
                status: import("hono/utils/http-status").ContentfulStatusCode;
            };
        }>;
    };
};
export type Client = typeof client;
export declare const hcWithType: (baseUrl: string, options?: import("hono").ClientRequestOptions | undefined) => Client;
export default hcWithType;
