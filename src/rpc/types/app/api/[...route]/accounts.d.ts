declare const accountRouter: import("hono/hono-base").HonoBase<import("hono/types").BlankEnv, {
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
}, "/">;
export default accountRouter;
