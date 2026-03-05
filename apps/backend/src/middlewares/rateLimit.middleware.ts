import type { Request, Response, NextFunction } from 'express';
import type { RedisWithScripts } from '../infrastructure/redis/interfaces/redisWithScripts.interface.js';

import { randomUUID } from 'crypto';

import { redisClient } from '../infrastructure/redis/redisClient.js';

export function rateLimit(limit: number, window: number) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const now = Date.now();
    const key = `rate_limit`;
    const uuid = randomUUID();

    try {
      const redis = redisClient.getClient() as RedisWithScripts;

      const isAllowed = await redis.rateLimit(key, now, limit, window, uuid);

      if (!isAllowed) {
        return res.status(429).json({ message: 'Too many requests' });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

