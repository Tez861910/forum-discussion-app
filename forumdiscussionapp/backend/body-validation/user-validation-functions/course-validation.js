import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for course creation
export const validateCourseCreate = validate(
  Joi.object({
    courseName: Joi.string().min(1).required(),
    createdByUserID: Joi.number().integer().min(1).required(),
    courseDescription: Joi.string().min(1).required(),
  })
);

// Validation middleware for updating a course
export const validateCourseUpdate = validate(
  Joi.object({
    courseId: Joi.number().integer().min(1).required(),
    courseName: Joi.string().min(1).required(),
    updatedByUserID: Joi.number().integer().min(1).required(),
    courseDescription: Joi.string().min(1).required(),
  })
);

// Validation middleware for getting a course by ID
export const validateCourseGetId = validate(
  Joi.object({
    courseId: Joi.number().integer().min(1).required(),
  })
);

// Validation middleware for deleting a course by ID
export const validateCourseDelete = validate(
  Joi.object({
    // Define the schema for deleting a course by ID
    courseId: Joi.number().integer().min(1).required(),
    deletedByUserID: Joi.number().integer().min(1).required(),
  })
);
