const Joi = require('joi');
const { validate } = require('../authvalid');

// Validation middleware for creating a new role
const validateRoleCreate = validate(Joi.object({
  // Define the schema for creating a new role
  name: Joi.string().min(3).max(255).required(),
  // Add any other fields as needed
}));

// Validation middleware for updating a role by ID
const validateRoleUpdate = validate(Joi.object({
  // Define the schema for updating a role
  name: Joi.string().min(3).max(255),
  // Add any other fields as needed
}));

// Validation middleware for getting a role by ID
const validateRoleId = validate(Joi.object({
  // Define the schema for getting a role by ID
  id: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateRoleCreate,
  validateRoleUpdate,
  validateRoleId,
};
