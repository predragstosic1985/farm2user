import fs from 'fs';
import path from 'path';
import sequelize from './database';
import logger from './logger';

/**
 * Database migration runner
 * Runs all .ts migration files in migrations/ directory
 */

interface Migration {
    name: string;
    up: (sequelize: typeof sequelize) => Promise<void>;
    down: (sequelize: typeof sequelize) => Promise<void>;
}

const migrationsDir = path.join(process.cwd(), 'migrations');

export const runMigrations = async (direction: 'up' | 'down' = 'up'): Promise<void> => {
    try {
        if (!fs.existsSync(migrationsDir)) {
            logger.warn(`Migrations directory not found at ${migrationsDir}`);
            return;
        }

        const files = fs
            .readdirSync(migrationsDir)
            .filter((file) => file.endsWith('.ts'))
            .sort();

        if (files.length === 0) {
            logger.info('No migrations found');
            return;
        }

        for (const file of files) {
            const filePath = path.join(migrationsDir, file);
            logger.info(`Running migration: ${file}`);

            try {
                // Dynamic import for migration file
                const migration = await import(filePath);
                const migrationModule: Migration = migration.default;

                if (direction === 'up' && migrationModule.up) {
                    await migrationModule.up(sequelize);
                } else if (direction === 'down' && migrationModule.down) {
                    await migrationModule.down(sequelize);
                }

                logger.info(`✓ Migration completed: ${file}`);
            } catch (error) {
                logger.error(`✗ Migration failed: ${file}`, error);
                throw error;
            }
        }

        logger.info('All migrations completed successfully');
    } catch (error) {
        logger.error('Migration runner failed:', error);
        throw error;
    }
};

// Run migrations if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const direction = (process.argv[2] as 'up' | 'down') || 'up';
    runMigrations(direction)
        .then(() => process.exit(0))
        .catch((error) => {
            logger.error(error);
            process.exit(1);
        });
}

export default runMigrations;
