import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for creating a real-time update
export const validateUpdateCreate = validate(
  Joi.object({
    // Define the schema for creating a real-time update
    // Add properties such as userId, content, timestamp, etc. based on your requirements
    userId: Joi.number().integer().min(1).required(),
    content: Joi.string().required(),
    timestamp: Joi.date().iso().required(),
    // Add more properties as needed
  })
);

// Validation middleware for getting a real-time update by ID
export const validateUpdateGet = validate(
  Joi.object({
    // Define the schema for getting a real-time update by ID
    updateId: Joi.number().integer().min(1).required(),
  })
);
