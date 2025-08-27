export interface ApiResponse<T = unknown> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T | null;
    error: string | null;
    timestamp: string;
}
declare function createResponse<T = unknown>({ success, message, data, error, statusCode, }: {
    success: boolean;
    message: string;
    data?: T | null;
    error?: unknown;
    statusCode?: number;
}): ApiResponse<T>;
declare const Responses: {
    success: <T>(message: string, data?: T) => ApiResponse<T>;
    created: <T>(message: string, data: T) => ApiResponse<T>;
    updated: <T>(message: string, data: T) => ApiResponse<T>;
    deleted: (message: string) => ApiResponse<unknown>;
    error: (message: string, error: unknown, statusCode?: number) => ApiResponse<unknown>;
    notFound: (resource?: string) => ApiResponse<unknown>;
    badRequest: (message: string) => ApiResponse<unknown>;
    unauthorized: (message?: string) => ApiResponse<unknown>;
    alreadyExists: (resource: string) => ApiResponse<unknown>;
    serverError: (message?: string) => ApiResponse<unknown>;
    forbidden: (message?: string) => ApiResponse<unknown>;
    validationError: (errors: string[]) => ApiResponse<unknown>;
    tooManyRequests: (message?: string) => ApiResponse<unknown>;
};
export { createResponse, Responses };
