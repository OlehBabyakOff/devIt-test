import { startApp } from './app.js';

import { logger } from './infrastructure/logger/pino.js';
import { redisClient } from './infrastructure/redis/redisClient.js';

import { ENV } from './configs/env.js';

async function main() {
  try {
    await redisClient.connect();

    const app = await startApp();

    const server = app.listen(ENV.PORT, () => logger.info(`Server is running on port ${ENV.PORT}`));

    const shutdown = async (signal: string) => {
      logger.info(`Received ${signal}, shutting down`);

      server.close();

      await redisClient.disconnect();

      process.exit(0);
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));

    process.on('uncaughtException', async (err) => {
      logger.fatal('Uncaught Exception', err as Error);

      await redisClient.disconnect();

      process.exit(1);
    });

    process.on('unhandledRejection', async (err) => {
      logger.fatal('Unhandled Rejection', err as Error);

      await redisClient.disconnect();

      process.exit(1);
    });
  } catch (error) {
    logger.fatal('Failed to start server', error as Error);

    process.exit(1);
  }
}

main();

