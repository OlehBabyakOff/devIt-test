import Joi from 'joi';

import { SCHEMA_ERRORS } from '../constants/schemaErrors.js';

export const requestSchema = Joi.object()
  .keys({
    index: Joi.number().integer().positive().min(1).max(1000).required(),
  })
  .messages(SCHEMA_ERRORS);

