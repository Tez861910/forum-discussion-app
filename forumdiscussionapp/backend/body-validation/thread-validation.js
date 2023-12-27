const Joi = require('joi');
const { validate } = require('../authvalid');

// Validation middleware for thread creation
const validateThreadCreate = validate(Joi.object({
  // Define the required properties for thread creation
  // For example:
  courseId: Joi.number().integer().min(1).required(),
  title: Joi.string().min(1).required(),
  // Add more properties as needed
}));

// Validation middleware for updating a thread
const validateThreadUpdate = validate(Joi.object({
  // Define the required properties for updating a thread
  // For example:
  threadId: Joi.number().integer().min(1).required(),
  title: Joi.string().min(1).required(),
  // Add more properties as needed
}));

// Validation middleware for getting threads by courseId
const validateThreadGetCourseId = validate(Joi.object({
  // Define the required properties for getting threads by courseId
  // For example:
  courseId: Joi.number().integer().min(1).required(),
}));

// Validation middleware for getting a thread by threadId
const validateThreadGetByThreadId = validate(Joi.object({
  // Define the required properties for getting a thread by threadId
  // For example:
  threadId: Joi.number().integer().min(1).required(),
}));

// Add more validation middleware as needed for other routes

module.exports = {
  validateThreadCreate,
  validateThreadUpdate,
  validateThreadGetCourseId,
  validateThreadGetByThreadId,
  // Add more exported validation middleware as needed
};
