import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for enrolling users in a course
export const validateCourseUsersEnroll = validate(
  Joi.object({
    // Define the schema for enrolling users in a course
    userIds: Joi.array().items(Joi.number().integer().min(1)).required(),
    courseId: Joi.number().integer().min(1).required(),
  })
);

// Validation middleware for enrolling users in a course
export const validateUserCoursesEnroll = validate(
  Joi.object({
    // Define the schema for enrolling users in a course
    courseIds: Joi.array().items(Joi.number().integer().min(1)).required(),
    userId: Joi.number().integer().min(1).required(),
  })
);

// Validation middleware for removing users from a course
export const validateRemoveUsersFromCourse = validate(
  Joi.object({
    // Define the schema for removing users from a course
    userIds: Joi.array().items(Joi.number().integer().min(1)).required(),
    courseId: Joi.number().integer().min(1).required(),
  })
);
