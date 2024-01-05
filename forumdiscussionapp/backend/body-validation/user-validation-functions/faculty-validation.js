const Joi = require('joi');
const { validate } = require('../../authvalid');

// Validation middleware for creating a new faculty member
const validateFacultyCreate = validate(Joi.object({
  // Define the schema for creating a new faculty member
  facultyName: Joi.string().trim().required(),
  // Add more properties as needed
}));

// Validation middleware for updating a faculty member by ID
const validateFacultyUpdate = validate(Joi.object({
  // Define the schema for updating a faculty member by ID
  facultyId: Joi.number().integer().min(1).required(),
  facultyName: Joi.string().trim().required(),
  // Add more properties as needed
}));

// Validation middleware for deleting a faculty member by ID
const validateFacultyDelete = validate(Joi.object({
  // Define the schema for deleting a faculty member by ID
  facultyId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateFacultyCreate,
  validateFacultyUpdate,
  validateFacultyDelete,
};
