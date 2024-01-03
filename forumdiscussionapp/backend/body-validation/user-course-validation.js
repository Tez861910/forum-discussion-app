const Joi = require('joi');
const { validate } = require('../authvalid');

// Validation middleware for enrolling users in a course
const validateCourseEnroll = validate(Joi.object({
  // Define the schema for enrolling users in a course
  userId: Joi.number().integer().min(1).required(),
  courseId: Joi.number().integer().min(1).required(),
}));

// Validation middleware for removing users from a course
const validateRemoveUsersFromCourse = validate(Joi.object({
  // Define the schema for removing users from a course
  userIds: Joi.array().items(Joi.number().integer().min(1)).required(),
  courseId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateCourseEnroll,
  validateRemoveUsersFromCourse,
};
