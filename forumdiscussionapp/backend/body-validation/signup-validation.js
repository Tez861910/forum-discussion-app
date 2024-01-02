const Joi = require('joi');
const { validate } = require('../authvalid');

// Validation middleware for signup
const validateSignup = validate(Joi.object({
  name: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  address: Joi.string().max(255),
  phoneNumber: Joi.string().max(20),
  dateOfBirth: Joi.date(),
  genderID: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateSignup,
};
