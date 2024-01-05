const Joi = require('joi');
const { validate } = require('../../authvalid');

// Validation middleware for getting role enrollments
const validateRoleId = validate(Joi.object({
  // Define the schema for getting role enrollments
  roleId: Joi.number().integer().min(1).required(),
}));

// Validation middleware for enrolling a user in a role
const validateRoleIdUserIdEnroll = validate(Joi.object({
  // Define the schema for enrolling a user in a role
  roleId: Joi.number().integer().min(1).required(),
  userId: Joi.number().integer().min(1).required(),
}));

// Validation middleware for removing a user from a role by ID
const validateRoleIdUserIdRemoveById = validate(Joi.object({
  // Define the schema for removing a user from a role by ID
  roleId: Joi.number().integer().min(1).required(),
  userId: Joi.number().integer().min(1).required(),
}));

// Validation middleware for removing users from a role
const validateRoleIdUserIdsRemove = validate(Joi.object({
  // Define the schema for removing users from a role
  roleId: Joi.number().integer().min(1).required(),
  userIds: Joi.array().items(Joi.number().integer().min(1)).required(),
}));

module.exports = {
  validateRoleId,
  validateRoleIdUserIdEnroll,
  validateRoleIdUserIdRemoveById,
  validateRoleIdUserIdsRemove,
};
