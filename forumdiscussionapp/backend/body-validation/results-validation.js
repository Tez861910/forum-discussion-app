const Joi = require('joi');
const { validate } = require('../authvalid');

// Validation middleware for creating a new exam result
const validateResultCreate = validate(Joi.object({
  // Define the schema for creating a new exam result
  studentId: Joi.number().integer().min(1).required(),
  courseId: Joi.number().integer().min(1).required(),
  marksObtained: Joi.number().integer().min(0).required(),
  // Add more properties as needed
}));

// Validation middleware for updating an exam result by ID
const validateResultUpdate = validate(Joi.object({
  // Define the schema for updating an exam result by ID
  resultId: Joi.number().integer().min(1).required(),
  studentId: Joi.number().integer().min(1),
  courseId: Joi.number().integer().min(1),
  marksObtained: Joi.number().integer().min(0),
  // Add more properties as needed
}));

// Validation middleware for deleting an exam result by ID
const validateResultDelete = validate(Joi.object({
  // Define the schema for deleting an exam result by ID
  resultId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateResultCreate,
  validateResultUpdate,
  validateResultDelete,
};
