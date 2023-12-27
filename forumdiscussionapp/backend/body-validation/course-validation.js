const Joi = require('joi');
const { validate } = require('../authvalid');

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

// Validation middleware for enrolling users in a course
const validateCourseEnroll = validate(Joi.object({
  courseId: Joi.number().integer().min(1).required(),
  userIds: Joi.number().integer().min(1).required(),
  // Add more properties as needed
}));

// Validation middleware for removing users from a course
const validateRemoveUsersFromCourse = validate(Joi.object({
  courseId: Joi.number().integer().min(1).required(),
  userIds: Joi.number().integer().min(1).required(),
  // Add more properties as needed
}));

module.exports = {
  validateCourseCreate,
  validateCourseUpdate,
  validateCourseGetId,
  validateCourseEnroll,
  validateRemoveUsersFromCourse,
};
