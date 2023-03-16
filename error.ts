import {Response} from "express";

export enum ErrorCause {
    ALREADY_EXIST = 0,
    NOT_FOUND = 1,
    INVALID_ARGUMENT = 2,
    DATABASE_CONFLICT = 3,
    NOT_CONNECTED = 4,
    UNAUTHORIZED = 5,
    UNSUPPORTED_METHOD = 6,
    BAD_CREDENTIALS = 6
}

export class SimpleError extends Error {
    private readonly _msg: string;
    private readonly _cause: ErrorCause;

    constructor(message: string, cause: ErrorCause) {
        super(message);
        this._msg = message;
        this._cause = cause;
        Error.captureStackTrace(this, this.constructor);
    }

    get msg(): string {
        return this._msg;
    }

    get cause(): ErrorCause {
        return this._cause;
    }

    get httpErrorCode() {
        switch (this.cause) {
            case ErrorCause.INVALID_ARGUMENT:
                return 400;
            case ErrorCause.BAD_CREDENTIALS:
                return 401
            case ErrorCause.NOT_CONNECTED:
                return 401
            case ErrorCause.UNAUTHORIZED:
                return 403
            case ErrorCause.NOT_FOUND:
                return 404;
            case ErrorCause.UNSUPPORTED_METHOD:
                return 405
            case ErrorCause.ALREADY_EXIST:
                return 409;
            case ErrorCause.DATABASE_CONFLICT:
                return 503;
        }

        return 501; // Not implemented :(
    }

    send(res: Response){
        res.status(this.httpErrorCode).json({error: this.msg});
    }
}
