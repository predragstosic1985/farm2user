import sequelize from './database';
import logger from './logger';

/**
 * Database seed runner
 * Populates database with initial test/development data
 */

export const seedDatabase = async (): Promise<void> => {
    try {
        logger.info('Starting database seeding...');

        // Seed data will be added here in future tasks
        // TODO: Add seed implementations for users, products, farmers, etc.

        logger.info('✓ Database seeding completed successfully');
    } catch (error) {
        logger.error('Database seeding failed:', error);
        throw error;
    }
};

// Run seeds if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    seedDatabase()
        .then(() => process.exit(0))
        .catch((error) => {
            logger.error(error);
            process.exit(1);
        });
}

export default seedDatabase;
