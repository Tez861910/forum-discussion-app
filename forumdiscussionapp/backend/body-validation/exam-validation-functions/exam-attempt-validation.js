import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for creating a new exam attempt
export const validateAttemptCreate = validate(
  Joi.object({
    // Define the schema for creating a new exam attempt
    studentId: Joi.number().integer().min(1).required(),
    courseId: Joi.number().integer().min(1).required(),
    examId: Joi.number().integer().min(1).required(),
    startedAt: Joi.date().iso().required(),
    // Add more properties as needed
  })
);

// Validation middleware for updating an exam attempt by ID
export const validateAttemptUpdate = validate(
  Joi.object({
    // Define the schema for updating an exam attempt by ID
    attemptId: Joi.number().integer().min(1).required(),
    studentId: Joi.number().integer().min(1),
    courseId: Joi.number().integer().min(1),
    examId: Joi.number().integer().min(1),
    startedAt: Joi.date().iso(),
    // Add more properties as needed
  })
);

// Validation middleware for deleting an exam attempt by ID
export const validateAttemptDelete = validate(
  Joi.object({
    // Define the schema for deleting an exam attempt by ID
    attemptId: Joi.number().integer().min(1).required(),
  })
);
