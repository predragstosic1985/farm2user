import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import env from '@/config/env';
import logger from '@/config/logger';
import { initDatabase } from '@/config/database';
import { loggingMiddleware } from '@/middleware/logging';
import { errorHandler } from '@/middleware/errorHandler';
import { ApiResponse } from '@/types';

dotenv.config();

const app: Express = express();

// Middleware
app.use(helmet()); // Security headers
app.use(
    cors({
        origin: env.FRONTEND_URL,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(loggingMiddleware);

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
    const response: ApiResponse = {
        success: true,
        data: {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
        },
    };
    res.json(response);
});

// API routes (to be implemented in T039+)
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/products', productRoutes);
// etc.

// 404 handler
app.use((_req: Request, res: Response) => {
    const response: ApiResponse = {
        success: false,
        message: 'Route not found',
    };
    res.status(404).json(response);
});

// Global error handler (must be last)
app.use(errorHandler);

// Initialize and start server
const startServer = async (): Promise<void> => {
    try {
        // Initialize database
        await initDatabase();

        // Start listening
        app.listen(env.PORT, () => {
            logger.info(`🚀 Server running on port ${env.PORT}`);
            logger.info(`Environment: ${env.NODE_ENV}`);
            logger.info(`Database: ${env.DB_NAME}@${env.DB_HOST}:${env.DB_PORT}`);
            logger.info(`Health check: ${env.API_URL}/api/health`);
        });
    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Handle graceful shutdown
process.on('SIGTERM', () => {
    logger.info('SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    logger.info('SIGINT received, shutting down gracefully');
    process.exit(0);
});

// Start server if not in test mode
if (env.NODE_ENV !== 'test') {
    startServer();
}

export default app;
