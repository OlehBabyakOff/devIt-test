import type { Redis } from 'ioredis';

export interface RedisWithScripts extends Redis {
  rateLimit(key: string, now: number, limit: number, window: number, uuid: string): Promise<number>;
}

