function createResponse({ success, message, data = null, error = null, statusCode = 200, }) {
    return {
        success,
        statusCode,
        message,
        data: data ?? null,
        error: error
            ? error instanceof Error
                ? error.message
                : String(error)
            : null,
        timestamp: new Date().toISOString(),
    };
}
const Responses = {
    success: (message, data) => createResponse({ success: true, message, data }),
    created: (message, data) => createResponse({ success: true, message, data, statusCode: 201 }),
    updated: (message, data) => createResponse({ success: true, message, data }),
    deleted: (message) => createResponse({ success: true, message }),
    error: (message, error, statusCode = 500) => createResponse({ success: false, message, error, statusCode }),
    notFound: (resource = "resource") => createResponse({
        success: false,
        message: `${resource} not found`,
        error: new Error("Not Found"),
        statusCode: 404,
    }),
    badRequest: (message) => createResponse({
        success: false,
        message,
        error: new Error("Bad Request"),
        statusCode: 400,
    }),
    unauthorized: (message = "Unauthorized access.") => createResponse({
        success: false,
        message,
        error: new Error("Unauthorized"),
        statusCode: 401,
    }),
    alreadyExists: (resource) => createResponse({
        success: false,
        message: `${resource} already exists`,
        error: new Error("Conflict"),
        statusCode: 409,
    }),
    serverError: (message = "Internal server error") => createResponse({
        success: false,
        message,
        error: new Error("Internal Server Error"),
        statusCode: 500,
    }),
    forbidden: (message = "Forbidden") => createResponse({
        success: false,
        message,
        error: new Error("Forbidden"),
        statusCode: 403,
    }),
    validationError: (errors) => createResponse({
        success: false,
        message: "Validation error",
        error: new Error(`Validation failed: ${errors.join(", ")}`),
        statusCode: 422,
    }),
    tooManyRequests: (message = "Too many requests") => createResponse({
        success: false,
        message,
        error: new Error("Too Many Requests"),
        statusCode: 429,
    }),
};
export { createResponse, Responses };
// ApiResponse is already exported as an interface, so no need to export again
