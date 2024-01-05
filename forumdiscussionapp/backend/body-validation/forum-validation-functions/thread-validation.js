import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for thread creation
export const validateThreadCreate = validate(
  Joi.object({
    // Define the required properties for thread creation
    // For example:
    courseId: Joi.number().integer().min(1).required(),
    title: Joi.string().min(1).required(),
    // Add more properties as needed
  })
);

// Validation middleware for updating a thread
export const validateThreadUpdate = validate(
  Joi.object({
    // Define the required properties for updating a thread
    // For example:
    threadId: Joi.number().integer().min(1).required(),
    title: Joi.string().min(1).required(),
    // Add more properties as needed
  })
);

// Validation middleware for getting threads by courseId
export const validateThreadGetCourseId = validate(
  Joi.object({
    // Define the required properties for getting threads by courseId
    // For example:
    courseId: Joi.number().integer().min(1).required(),
  })
);

// Validation middleware for getting a thread by threadId
export const validateThreadGetByThreadId = validate(
  Joi.object({
    // Define the required properties for getting a thread by threadId
    // For example:
    threadId: Joi.number().integer().min(1).required(),
  })
);
