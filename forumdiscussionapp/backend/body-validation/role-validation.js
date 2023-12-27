const Joi = require('joi');
const { validate } = require('../authvalid'); 

// Validation middleware
const validateRoleCreate = validate(Joi.object({
  roleName: Joi.string().min(1).required()
}));

const validateRoleUpdate = validate(Joi.object({
  id: Joi.number().integer().min(1).required(),
  roleName: Joi.string().min(1).required()
}));

const validateRoleId = validate(Joi.object({
  id: Joi.number().integer().min(1).required()
}));

const validateRoleIdUserId = validate(Joi.object({
  roleId: Joi.number().integer().min(1).required(),
  userIds: Joi.number().integer().min(1).required()
}));

module.exports = {
  validateRoleCreate,
  validateRoleUpdate,
  validateRoleId,
  validateRoleIdUserId,
};
