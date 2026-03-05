import { Router } from 'express';

import { apiController } from '../controllers/api.controller.js';

import { rateLimit } from '../middlewares/rateLimit.middleware.js';

const router = Router();

router.use(rateLimit(50, 1000));

router.get('/api', apiController.getIndex);

export default router;

