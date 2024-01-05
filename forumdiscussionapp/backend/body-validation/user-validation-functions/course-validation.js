import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for course creation
export const validateCourseCreate = validate(
  Joi.object({
    courseName: Joi.string().min(1).required(),
    // Add more properties as needed
  })
);

// Validation middleware for updating a course
export const validateCourseUpdate = validate(
  Joi.object({
    id: Joi.number().integer().min(1).required(),
    courseName: Joi.string().min(1).required(),
    // Add more properties as needed
  })
);

// Validation middleware for getting a course by ID
export const validateCourseGetId = validate(
  Joi.object({
    id: Joi.number().integer().min(1).required(),
  })
);

// Validation middleware for deleting a course by ID
export const validateCourseDelete = validate(
  Joi.object({
    // Define the schema for deleting a course by ID
    id: Joi.number().integer().min(1).required(),
  })
);
