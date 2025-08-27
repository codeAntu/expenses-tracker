declare const authRoute: import("hono/hono-base").HonoBase<import("hono/types").BlankEnv, {
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
}, "/">;
export default authRoute;
