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
            };
        }>;
    };
} & {
    api: {
        account: {
            [x: string]: import("hono/client").ClientRequest<{}>;
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
