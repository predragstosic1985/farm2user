import { Sequelize } from 'sequelize';
import env from './env';
import logger from './logger';

// Create Sequelize instance with connection pool
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_NAME,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    logging: env.NODE_ENV === 'development' ? (msg) => logger.debug(msg) : false,
    pool: {
        max: 25, // Maximum number of connection in pool
        min: 5, // Minimum number of connection in pool
        acquire: 30000, // The maximum time, in milliseconds, that pool will try to get connection before throwing error
        idle: 10000, // The maximum time, in milliseconds, that a connection can be idle before being released
    },
    define: {
        timestamps: true,
        underscored: true, // Use snake_case for column names
        paranoid: true, // Soft deletes (deletedAt column)
    },
    query: {
        raw: false, // Return model instances by default
    },
});

// Test connection
export const testConnection = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        logger.info('Database connection has been established successfully.');
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
        throw error;
    }
};

// Initialize database
export const initDatabase = async (): Promise<void> => {
    try {
        await testConnection();
        // Sync database (without altering existing tables in production)
        const force = env.NODE_ENV === 'test';
        await sequelize.sync({ force, alter: env.NODE_ENV === 'development' });
        logger.info('Database synchronized successfully.');
    } catch (error) {
        logger.error('Database initialization failed:', error);
        throw error;
    }
};

// Close database connection
export const closeDatabase = async (): Promise<void> => {
    try {
        await sequelize.close();
        logger.info('Database connection closed.');
    } catch (error) {
        logger.error('Error closing database connection:', error);
        throw error;
    }
};

export default sequelize;
