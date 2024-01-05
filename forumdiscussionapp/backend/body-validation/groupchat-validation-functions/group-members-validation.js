const Joi = require('joi');
const { validate } = require('../../authvalid');

// Validation middleware for creating a group member
const validateGroupMembersCreate = validate(Joi.object({
  // Define the schema for creating a group member
  // Adjust the properties and validation rules according to your needs
  groupId: Joi.number().integer().min(1).required(),
  userId: Joi.number().integer().min(1).required(),
  // Add more properties as needed
}));

// Validation middleware for deleting a group member
const validateGroupMembersDelete = validate(Joi.object({
  // Define the schema for deleting a group member
  groupId: Joi.number().integer().min(1).required(),
  userId: Joi.number().integer().min(1).required(),
}));

// Validation middleware for getting group members by group ID
const validateGroupMembersGetByGroupId = validate(Joi.object({
  // Define the schema for getting group members by group ID
  groupId: Joi.number().integer().min(1).required(),
}));

// Validation middleware for getting groups by user ID
const validateGroupMembersGetByUserId = validate(Joi.object({
  // Define the schema for getting groups by user ID
  userId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateGroupMembersCreate,
  validateGroupMembersDelete,
  validateGroupMembersGetByGroupId,
  validateGroupMembersGetByUserId,
};
