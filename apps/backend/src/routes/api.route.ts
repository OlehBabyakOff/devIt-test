import { Router } from 'express';

import { apiController } from '../controllers/api.controller.js';

const router = Router();

router.get('/api', apiController.getIndex);

export default router;

