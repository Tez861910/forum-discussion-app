const Joi = require('joi');
const { validate } = require('../../authvalid');

// Validation middleware for login
const validateLogin = validate(Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}));

module.exports = {
  validateLogin,
};
