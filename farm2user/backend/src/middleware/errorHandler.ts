import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/utils/errors';
import logger from '@/config/logger';
import { ApiResponse } from '@/types';

/**
 * Global error handling middleware
 * Must be registered last in middleware stack
 */
export const errorHandler = (
    error: Error | AppError,
    _req: Request,
    res: Response,
    _next: NextFunction
): void => {
    if (error instanceof AppError) {
        logger.warn(`[${error.code}] ${error.message}`, { statusCode: error.statusCode });

        const response: ApiResponse & { code?: string } = {
            success: false,
            message: error.message,
            code: error.code,
            ...(error.errors.length > 0 && { errors: error.errors }),
        };

        res.status(error.statusCode).json(response);
        return;
    }

    // Handle unexpected errors
    logger.error('Unhandled error:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
    });

    const response: ApiResponse & { code?: string } = {
        success: false,
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
    };

    res.status(500).json(response);
};

/**
 * Async error wrapper for route handlers
 * Catches errors in async functions and passes to error handler
 */
export const asyncHandler =
    (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
        (req: Request, res: Response, next: NextFunction) => {
            return Promise.resolve(fn(req, res, next)).catch(next);
        };
