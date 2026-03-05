import 'dotenv/config';

import { validator } from '../infrastructure/validator/validator.js';

import { envSchema } from '../schemas/env.schema.js';

export const ENV = (() => {
  const envToValidate = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    REDIS: {
      HOST: process.env.REDIS_HOST,
      PORT: process.env.REDIS_PORT,
      USER: process.env.REDIS_USER,
      PASSWORD: process.env.REDIS_PASSWORD,
      KEY_PREFIX: process.env.REDIS_KEY_PREFIX,
      MAX_RETRIES_PER_REQUEST: process.env.REDIS_MAX_RETRIES_PER_REQUEST,
      ENABLE_OFFLINE_QUEUE: process.env.REDIS_ENABLE_OFFLINE_QUEUE,
      CONNECT_TIMEOUT: process.env.REDIS_CONNECT_TIMEOUT,
      COMMAND_TIMEOUT: process.env.REDIS_COMMAND_TIMEOUT,
    },
  };

  try {
    const validatedEnv = validator.validateEnv(envSchema, envToValidate);

    return {
      NODE_ENV: validatedEnv.NODE_ENV,
      PORT: validatedEnv.PORT,
      CORS_ORIGIN: validatedEnv.CORS_ORIGIN,

      REDIS: validatedEnv.REDIS,
    };
  } catch (error: any) {
    console.error(error);

    process.exit(1);
  }
})();

