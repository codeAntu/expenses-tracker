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
        auth: import("hono/client").ClientRequest<{
            $post: {
                input: {
                    form: {
                        idToken: string;
                    };
                };
                output: {
                    message: string;
                    user: null;
                };
                outputFormat: "json";
                status: 401;
            } | {
                input: {
                    form: {
                        idToken: string;
                    };
                };
                output: {
                    message: string;
                    user: {
                        id: string;
                        name: string;
                        email: string;
                        totalAmount: string;
                        picture: string;
                        token: string;
                    };
                };
                outputFormat: "json";
                status: 200;
            };
        }>;
    };
} & {
    api: {
        transaction: import("hono/client").ClientRequest<{
            $get: {
                input: {};
                output: {
                    transactions: {
                        id: string;
                        amount: number;
                        description: string;
                        transactionType: "income" | "expense";
                        userId: string;
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
                    transaction: {
                        id: string;
                    }[];
                    updatedAmount: {
                        id: string;
                        amount: string;
                    }[];
                };
                outputFormat: "json";
                status: import("hono/utils/http-status").ContentfulStatusCode;
            };
        }>;
    };
} & {
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
export type Client = typeof client;
export declare const hcWithType: (baseUrl: string, options?: import("hono").ClientRequestOptions | undefined) => Client;
export default hcWithType;
