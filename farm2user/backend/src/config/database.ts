import { Sequelize } from 'sequelize';
import env from './env';
import logger from './logger';

// Create Sequelize instance with connection pool (attempt Postgres first)
let sequelize: Sequelize = new Sequelize({
    dialect: 'postgres',
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_NAME,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    logging: env.NODE_ENV === 'development' ? (msg: string) => logger.debug(msg) : false,
    pool: {
        max: 25,
        min: 5,
        acquire: 30000,
        idle: 10000,
    },
    define: {
        timestamps: true,
        underscored: true,
        paranoid: true,
    },
    query: {
        raw: false,
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

// Initialize database with fallback to SQLite for development convenience
export const initDatabase = async (): Promise<void> => {
    try {
        await testConnection();
        const force = env.NODE_ENV === 'test';
        await sequelize.sync({ force, alter: env.NODE_ENV === 'development' });
        logger.info('Database synchronized successfully.');
    } catch (error: any) {
        logger.error('Database initialization failed:', error);

        // If development and Postgres not available, fallback to SQLite to allow local dev
        if (env.NODE_ENV === 'development') {
            logger.warn('Falling back to SQLite in-memory database for development.');
            sequelize = new Sequelize({
                dialect: 'sqlite',
                storage: ':memory:',
                logging: (msg: string) => logger.debug(msg),
                define: {
                    timestamps: true,
                    underscored: true,
                    paranoid: true,
                },
            });

            try {
                await sequelize.authenticate();
                await sequelize.sync({ force: false, alter: true });
                logger.info('SQLite in-memory database initialized for development.');
                return;
            } catch (sqliteErr) {
                logger.error('SQLite fallback initialization failed:', sqliteErr);
                throw sqliteErr;
            }
        }

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
