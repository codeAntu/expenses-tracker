declare const KeyAuth: import("hono/hono-base").HonoBase<import("hono/types").BlankEnv, {
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
}, "/">;
export default KeyAuth;
