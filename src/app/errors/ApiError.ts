
// Error ekta class beacuse of jara error likechilo tara classBase error likechilo

class ApiError extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string | undefined, stack = '') {
        super(message)
        this.statusCode = statusCode
        if (stack) {
            this.stack = stack
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;