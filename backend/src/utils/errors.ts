import { ERROR_CODES } from '@/config/constants';

export class AppError extends Error {
    constructor(
        public statusCode: number,
        public message: string,
        public code: string = ERROR_CODES.INTERNAL_SERVER_ERROR,
        public errors: Array<{ field?: string; message: string }> = []
    ) {
        super(message);
        Object.setPrototypeOf(this, AppError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ValidationError extends AppError {
    constructor(
        message: string = 'Validation failed',
        errors: Array<{ field?: string; message: string }> = []
    ) {
        super(400, message, ERROR_CODES.VALIDATION_ERROR, errors);
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string = 'Unauthorized') {
        super(401, message, ERROR_CODES.UNAUTHORIZED);
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string = 'Forbidden') {
        super(403, message, ERROR_CODES.FORBIDDEN);
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}

export class NotFoundError extends AppError {
    constructor(resource: string = 'Resource') {
        super(404, `${resource} not found`, ERROR_CODES.NOT_FOUND);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}

export class ConflictError extends AppError {
    constructor(message: string = 'Conflict') {
        super(409, message, ERROR_CODES.CONFLICT);
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
}

export class InvalidTokenError extends AppError {
    constructor(message: string = 'Invalid or expired token') {
        super(401, message, ERROR_CODES.INVALID_TOKEN);
        Object.setPrototypeOf(this, InvalidTokenError.prototype);
    }
}

export class TokenExpiredError extends AppError {
    constructor(message: string = 'Token has expired') {
        super(401, message, ERROR_CODES.TOKEN_EXPIRED);
        Object.setPrototypeOf(this, TokenExpiredError.prototype);
    }
}

export class InsufficientBalanceError extends AppError {
    constructor(message: string = 'Insufficient balance') {
        super(400, message, ERROR_CODES.INSUFFICIENT_BALANCE);
        Object.setPrototypeOf(this, InsufficientBalanceError.prototype);
    }
}

export class OutOfStockError extends AppError {
    constructor(message: string = 'Product out of stock') {
        super(400, message, ERROR_CODES.PRODUCT_OUT_OF_STOCK);
        Object.setPrototypeOf(this, OutOfStockError.prototype);
    }
}
