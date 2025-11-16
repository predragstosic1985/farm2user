import { Request, Response, NextFunction } from 'express';
import logger from '@/config/logger';

/**
 * Request logging middleware
 * Logs HTTP method, path, status code, and response time
 */
export const loggingMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const start = Date.now();
    const { method, url, headers } = req;

    // Log response when it's finished
    res.on('finish', () => {
        const duration = Date.now() - start;
        const { statusCode } = res;

        const level =
            statusCode >= 400
                ? 'warn'
                : statusCode >= 200 && statusCode < 300
                    ? 'info'
                    : 'debug';

        logger[level](
            `${method} ${url} - ${statusCode} (${duration}ms)`,
            {
                method,
                url,
                statusCode,
                duration,
                userAgent: headers['user-agent'],
            }
        );
    });

    next();
};
