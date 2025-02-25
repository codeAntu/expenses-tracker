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
                };
                outputFormat: "json";
                status: import("hono/utils/http-status").ContentfulStatusCode;
            };
            $get: {
                input: {};
                output: {
                    message: string;
                };
                outputFormat: "json";
                status: 401;
            } | {
                input: {};
                output: {
                    message: string;
                    user: {
                        [x: string]: any;
                        aud: string;
                        auth_time: number;
                        email?: string | undefined;
                        email_verified?: boolean | undefined;
                        exp: number;
                        firebase: {
                            [x: string]: any;
                            identities: {
                                [x: string]: any;
                            };
                            sign_in_provider: string;
                            sign_in_second_factor?: string | undefined;
                            second_factor_identifier?: string | undefined;
                            tenant?: string | undefined;
                        };
                        iat: number;
                        iss: string;
                        phone_number?: string | undefined;
                        picture?: string | undefined;
                        sub: string;
                        uid: string;
                    };
                };
                outputFormat: "json";
                status: import("hono/utils/http-status").ContentfulStatusCode;
            };
        }>;
    };
} & {
    api: {
        user: {
            user: import("hono/client").ClientRequest<{
                $get: {
                    input: {};
                    output: {
                        message: string;
                        user: {
                            id: string;
                            name: string;
                            email: string;
                            totalAmount: string;
                            createdAt: string;
                            updatedAt: string;
                        };
                    };
                    outputFormat: "json";
                    status: import("hono/utils/http-status").ContentfulStatusCode;
                };
                $post: {
                    input: {};
                    output: {
                        message: string;
                        userId: {
                            id: string;
                        }[];
                    };
                    outputFormat: "json";
                    status: import("hono/utils/http-status").ContentfulStatusCode;
                };
            }>;
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
