import { hc } from "hono/client";
declare const client: {
    api: import("hono/client").ClientRequest<{
        $get: {
            input: {};
            output: {
                message: string;
                status: boolean;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    }>;
};
export type Client = typeof client;
export declare const hcWithType: (baseUrl: string, options?: import("hono").ClientRequestOptions | undefined) => Client;
export default hcWithType;
