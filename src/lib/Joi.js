'use strict';

const Joi = require('@hapi/joi');
const Constant = require('./Constant');

Joi._validate = (
  value,
  schema,
  options
) => {
  const _schema = Joi.object(schema);
  for (let key in value) {
    if (value[key] === '' || !schema[key]) {
      delete value[key];
    }
  }
  const validateResult = _schema.validate(value, { ...{
    convert: true,
    abortEarly: true,
    allowUnknown: true,
  }, ...options });
  if (validateResult && validateResult.error) {
    validateResult.error.isValid = true;
    throw validateResult.error;
  }
  return validateResult.value;
};

Joi.lib = {
  mobile: Joi.string().pattern(Constant.pattern.mobile),
  datetime: Joi.string().pattern(Constant.pattern.datetime),
  listAndSort: {
    page: Joi.number().integer().min(1).default(1),
    rows: Joi.number().integer().min(1).max(500).default(10),
    sortOrder: Joi.number().valid(1, -1).default(-1),
    sortField: Joi.string().default('_id'),
  },
  enum(enumDict) {
    return Joi.string().valid(...Object.values(enumDict));
  },
};

module.exports = Joi;
