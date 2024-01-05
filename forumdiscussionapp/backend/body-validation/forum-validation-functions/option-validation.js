import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for creating a poll option
export const validatePollOptionCreate = validate(
  Joi.object({
    // Define the schema for creating a poll option
    // Adjust the properties and validation rules according to your needs
    pollId: Joi.number().integer().min(1).required(),
    optionText: Joi.string().trim().required(),
  })
);

// Validation middleware for updating a poll option
export const validatePollOptionUpdate = validate(
  Joi.object({
    // Define the schema for updating a poll option
    // Adjust the properties and validation rules according to your needs
    pollOptionId: Joi.number().integer().min(1).required(),
    optionText: Joi.string().trim(),
  })
);

// Validation middleware for deleting a poll option
export const validatePollOptionDelete = validate(
  Joi.object({
    // Define the schema for deleting a poll option
    pollOptionId: Joi.number().integer().min(1).required(),
  })
);

// Validation middleware for getting poll options by pollId
export const validatePollOptionGetByPollId = validate(
  Joi.object({
    // Define the schema for getting poll options by pollId
    pollId: Joi.number().integer().min(1).required(),
  })
);
