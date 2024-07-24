const Joi = require('joi');

const createPolicyRequestBody = Joi.object().keys({
  name: Joi.string().required(),
  type: Joi.string().required(),
  coverage: Joi.number().required(),
  premium: Joi.number().required()
});

const updatePolicyRequestBody = Joi.object().keys({
  name: Joi.string().optional(),
  type: Joi.string().optional(),
  coverage: Joi.number().optional(),
  premium: Joi.number().optional()
});

module.exports = {
  createPolicyRequestBody,
  updatePolicyRequestBody
};
