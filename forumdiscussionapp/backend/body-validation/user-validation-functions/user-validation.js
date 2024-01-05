const Joi = require('joi');
const { validate } = require('../../authvalid');

// Validation middleware for user creation
const validateUserCreate = validate(Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  // Add more properties as needed
}));

// Validation middleware for updating a user
const validateUserUpdate = validate(Joi.object({
  id: Joi.number().integer().min(1).required(),
  email: Joi.string().email().required(),
  // Add more properties as needed
}));

// Validation middleware for updating user profile
const validateUserUpdateUsers = validate(Joi.object({
  id: Joi.number().integer().min(1).required(),
  newField: Joi.string().min(1).required(),
  // Add more properties as needed
}));

// Validation middleware for getting a user by ID
const validateUserGetId = validate(Joi.object({
  id: Joi.number().integer().min(1).required(),
}));

// Validation middleware for getting users by RoleID
const validateUserGetRoleId = validate(Joi.object({
  roleId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateUserCreate,
  validateUserUpdate,
  validateUserUpdateUsers,
  validateUserGetId,
  validateUserGetRoleId,
};
