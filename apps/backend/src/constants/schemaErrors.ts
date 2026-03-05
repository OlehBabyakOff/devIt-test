export const SCHEMA_ERRORS = Object.freeze({
  // number errors
  'number.base': '{{#label}} must be a number',
  'number.integer': '{{#label}} must be an integer',
  'number.max': '{{#label}} must be less than or equal to {{#limit}}',
  'number.min': '{{#label}} must be greater than or equal to {{#limit}}',
  'number.positive': '{{#label}} must be a positive number',

  // other errors
  'any.required': '{{#label}} is required',
});

