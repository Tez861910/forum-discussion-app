import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for comment creation
export const validateCommentCreate = validate(
  Joi.object({
    // Define the required properties for comment creation
    // For example:
    userId: Joi.number().integer().min(1).required(),
    threadId: Joi.number().integer().min(1).required(),
    content: Joi.string().min(1).required(),
    // Add more properties as needed
  })
);

// Validation middleware for updating a comment
export const validateCommentUpdate = validate(
  Joi.object({
    // Define the required properties for updating a comment
    // For example:
    commentId: Joi.number().integer().min(1).required(),
    content: Joi.string().min(1).required(),
    // Add more properties as needed
  })
);

// Validation middleware for deleting a comment
export const validateCommentDelete = validate(
  Joi.object({
    // Define the required properties for deleting a comment
    // For example:
    commentId: Joi.number().integer().min(1).required(),
  })
);

// Validation middleware for getting comments by threadId
export const validateCommentGetThreadId = validate(
  Joi.object({
    // Define the required properties for getting comments by threadId
    // For example:
    threadId: Joi.number().integer().min(1).required(),
  })
);
