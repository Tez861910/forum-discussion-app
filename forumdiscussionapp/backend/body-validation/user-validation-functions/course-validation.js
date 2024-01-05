const Joi = require('joi');
const { validate } = require('../../authvalid');

// Validation middleware for course creation
const validateCourseCreate = validate(Joi.object({
  courseName: Joi.string().min(1).required(),
  // Add more properties as needed
}));

// Validation middleware for updating a course
const validateCourseUpdate = validate(Joi.object({
  id: Joi.number().integer().min(1).required(),
  courseName: Joi.string().min(1).required(),
  // Add more properties as needed
}));

// Validation middleware for getting a course by ID
const validateCourseGetId = validate(Joi.object({
  id: Joi.number().integer().min(1).required(),
}));

// Validation middleware for deleting a course by ID
const validateCourseDelete = validate(Joi.object({
  // Define the schema for deleting a course by ID
  id: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateCourseCreate,
  validateCourseUpdate,
  validateCourseGetId,
  validateCourseDelete,
};
