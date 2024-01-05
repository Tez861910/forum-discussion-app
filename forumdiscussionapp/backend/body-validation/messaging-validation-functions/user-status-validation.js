const Joi = require('joi');
const { validate } = require('../../authvalid');

// Validation middleware for updating user status by user ID
const validateStatusUpdate = validate(Joi.object({
  // Define the schema for updating user status by user ID
  userId: Joi.number().integer().min(1).required(),
  status: Joi.string().valid('active', 'inactive').required(),
  // Add more properties as needed
}));

// Validation middleware for getting user status by user ID
const validateUserStatusGet = validate(Joi.object({
  // Define the schema for getting user status by user ID
  userId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateStatusUpdate,
  validateUserStatusGet,
};
