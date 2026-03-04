import type { Request } from 'express';
import type { Schema } from 'joi';

class Validator {
  async validateRequest(schema: Schema, req: Request) {
    if (!schema) {
      throw new Error('Schema is required');
    }

    const { body, params, query } = req;

    const data = {
      ...body,
      ...params,
      ...query,
    };

    const DTO = await schema.validateAsync(data, {
      errors: { wrap: { label: '' } },
      convert: true,
      stripUnknown: true,
    });

    return DTO;
  }

  validateEnv(schema: Schema, env: Object) {
    const { value, error } = schema.validate(env, {
      convert: true,
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      throw new Error(`ENV validation error: ${error.message}`);
    }

    return value;
  }
}

export const validator = new Validator();

