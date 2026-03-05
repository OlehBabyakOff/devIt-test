import type { Request, Response, NextFunction } from 'express';
import { logger } from '../infrastructure/logger/pino.js';

export function notFound() {
  return (req: Request, res: Response, next: NextFunction) => {
    logger.info(`Page not found: ${req.path}`);

    return res.status(404).json({ message: 'Page not found' });
  };
}

