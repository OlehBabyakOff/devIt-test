export const INTERNAL_ERRORS = {
  INTERNAL_SERVER_ERROR: {
    message: 'Internal Server Error',
    status: 'INTERNAL_SERVER_ERROR',
    statusCode: 500,
  },
};

export const VALIDATION_ERRORS = {
  INVALID_PARAMS: {
    message: 'Invalid parameters',
    status: 'INVALID_PARAMS',
    statusCode: 400,
  },

  INVALID_ENV: {
    statusCode: 500,
    status: 'INVALID_ENV',
    defaultMessage: 'Environment variables validation failed',
  },
};

