import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '@/utils/jwt';
import { UnauthorizedError } from '@/utils/errors';

/**
 * JWT authentication middleware
 * Verifies access token from Authorization header
 * Attaches user payload to request object
 */
export const authMiddleware = (
    req: Request,
    _res: Response,
    next: NextFunction
): void => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedError('Missing authorization header');
        }

        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            throw new UnauthorizedError('Invalid authorization header format');
        }

        const token = parts[1];
        const payload = verifyAccessToken(token);

        req.user = payload;
        next();
    } catch (error) {
        next(error);
    }
};

/**
 * Optional authentication middleware
 * Does not require authentication but attaches user if token is valid
 */
export const optionalAuthMiddleware = (
    req: Request,
    _res: Response,
    next: NextFunction
): void => {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const parts = authHeader.split(' ');
            if (parts.length === 2 && parts[0] === 'Bearer') {
                const token = parts[1];
                const payload = verifyAccessToken(token);
                req.user = payload;
            }
        }

        next();
    } catch (error) {
        // Ignore auth errors for optional auth
        next();
    }
};
