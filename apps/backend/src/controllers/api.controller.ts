import type { Request, Response } from 'express';

import { apiService } from '../services/api.service.js';
import { validator } from '../infrastructure/validator/validator.js';

import { requestSchema } from '../schemas/request.schema.js';

class ApiController {
  async getIndex(req: Request, res: Response) {
    const RequestDTO = await validator.validateRequest(requestSchema, req);

    const result = await apiService.getIndex(RequestDTO.index);

    return res.json(result);
  }
}

export const apiController = new ApiController();

