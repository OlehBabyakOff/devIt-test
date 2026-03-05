import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';

import { requestId } from './middlewares/reqId.middleware.js';
import { requestLogger } from './middlewares/requestLogger.middleware.js';

import apiRouter from './routes/api.route.js';

import { ENV } from './configs/env.js';

export async function startApp() {
  const app = express();

  app.set('trust proxy', true);

  app.use(requestId());

  app.use(helmet());

  app.use(express.json());

  app.use(cors({ origin: ENV.CORS_ORIGIN, methods: ['GET'] }));

  app.use(compression({ threshold: 1024 }));

  app.use(requestLogger());

  app.use(apiRouter);

  return app;
}

