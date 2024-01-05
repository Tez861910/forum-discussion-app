import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for response creation
export const validateResponseCreate = validate(
  Joi.object({
    // Define the required properties for response creation
    // For example:
    commentId: Joi.number().integer().min(1).required(),
    content: Joi.string().min(1).required(),
    // Add more properties as needed
  })
);

// Validation middleware for updating a response
export const validateResponseUpdate = validate(
  Joi.object({
    // Define the required properties for updating a response
    // For example:
    responseId: Joi.number().integer().min(1).required(),
    content: Joi.string().min(1).required(),
    // Add more properties as needed
  })
);

// Validation middleware for deleting a response
export const validateResponseDelete = validate(
  Joi.object({
    // Define the required properties for deleting a response
    // For example:
    responseId: Joi.number().integer().min(1).required(),
  })
);
