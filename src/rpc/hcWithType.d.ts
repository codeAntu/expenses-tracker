import { hc } from "hono/client";
declare const client: {
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
} & {
    api: {
        hello: import("hono/client").ClientRequest<{
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
        }>;
    };
};
export type Client = typeof client;
export declare const hcWithType: (baseUrl: string, options?: import("hono").ClientRequestOptions | undefined) => Client;
export default hcWithType;
