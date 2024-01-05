const Joi = require('joi');
const { validate } = require('../../authvalid');

// Validation middleware for avatar upload
const validateAvatarUpload = validate(Joi.object({
  userId: Joi.number().integer().min(1).required(),
}));

// Validation middleware for token refresh
const validateTokenRefresh = validate(Joi.object({
  userId: Joi.number().integer().min(1).required(),
  email: Joi.string().email().required(),
  roleId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateAvatarUpload,
  validateTokenRefresh,
};
