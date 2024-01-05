const Joi = require('joi');
const { validate } = require('../../authvalid');

// Validation middleware for creating a new department
const validateDepartmentCreate = validate(Joi.object({
  // Define the schema for creating a new department
  departmentName: Joi.string().trim().required(),
  // Add more properties as needed
}));

// Validation middleware for updating a department by ID
const validateDepartmentUpdate = validate(Joi.object({
  // Define the schema for updating a department by ID
  departmentId: Joi.number().integer().min(1).required(),
  departmentName: Joi.string().trim().required(),
  // Add more properties as needed
}));

// Validation middleware for deleting a department by ID
const validateDepartmentDelete = validate(Joi.object({
  // Define the schema for deleting a department by ID
  departmentId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateDepartmentCreate,
  validateDepartmentUpdate,
  validateDepartmentDelete,
};
