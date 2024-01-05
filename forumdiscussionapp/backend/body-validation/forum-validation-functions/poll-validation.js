import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for creating a poll
export const validatePollCreate = validate(
  Joi.object({
    // Define the schema for creating a poll
    // Adjust the properties and validation rules according to your needs
    question: Joi.string().trim().required(),
    options: Joi.array().items(Joi.string().trim()).min(2).required(),
  })
);

// Validation middleware for updating a poll
export const validatePollUpdate = validate(
  Joi.object({
    // Define the schema for updating a poll
    // Adjust the properties and validation rules according to your needs
    pollId: Joi.number().integer().min(1).required(),
    question: Joi.string().trim(),
    options: Joi.array().items(Joi.string().trim()).min(2),
  })
);

// Validation middleware for deleting a poll
export const validatePollDelete = validate(
  Joi.object({
    // Define the schema for deleting a poll
    pollId: Joi.number().integer().min(1).required(),
  })
);

// Validation middleware for getting polls created by a specific user
export const validatePollGetCreatedByUserId = validate(
  Joi.object({
    // Define the schema for getting polls created by a specific user
    userId: Joi.number().integer().min(1).required(),
  })
);
