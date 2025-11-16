import { Request, Response, NextFunction } from 'express';
import { ForbiddenError, UnauthorizedError } from '@/utils/errors';
import { UserRole } from '@/types';

/**
 * Role-based access control middleware
 * Checks if authenticated user has required role(s)
 */
export const requireRole = (...roles: UserRole[]) => {
    return (req: Request, _res: Response, next: NextFunction): void => {
        if (!req.user) {
            throw new UnauthorizedError('Authentication required');
        }

        const userRole = req.user.userType as UserRole;
        if (!roles.includes(userRole)) {
            throw new ForbiddenError(
                `This action requires one of these roles: ${roles.join(', ')}`
            );
        }

        next();
    };
};

/**
 * Middleware to require customer role
 */
export const requireCustomer = (
    req: Request,
    _res: Response,
    next: NextFunction
): void => {
    if (!req.user) {
        throw new UnauthorizedError('Authentication required');
    }

    if (req.user.userType !== 'customer') {
        throw new ForbiddenError('This action is only available to customers');
    }

    next();
};

/**
 * Middleware to require farmer role
 */
export const requireFarmer = (
    req: Request,
    _res: Response,
    next: NextFunction
): void => {
    if (!req.user) {
        throw new UnauthorizedError('Authentication required');
    }

    if (req.user.userType !== 'farmer') {
        throw new ForbiddenError('This action is only available to farmers');
    }

    next();
};

/**
 * Middleware to require admin role
 */
export const requireAdmin = (
    req: Request,
    _res: Response,
    next: NextFunction
): void => {
    if (!req.user) {
        throw new UnauthorizedError('Authentication required');
    }

    if (req.user.userType !== 'admin') {
        throw new ForbiddenError('This action is only available to admins');
    }

    next();
};

/**
 * Middleware to check if user owns resource
 * Compares req.user.userId with resourceOwnerId
 */
export const checkOwnership = (
    req: Request,
    _res: Response,
    next: NextFunction,
    resourceOwnerId: string
): void => {
    if (!req.user) {
        throw new UnauthorizedError('Authentication required');
    }

    if (req.user.userId !== resourceOwnerId && req.user.userType !== 'admin') {
        throw new ForbiddenError('You do not have permission to access this resource');
    }

    next();
};
