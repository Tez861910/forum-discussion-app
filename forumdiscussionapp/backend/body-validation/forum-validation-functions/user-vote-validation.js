import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for creating a user poll vote
export const validateUserPollVoteCreate = validate(
  Joi.object({
    // Define the schema for creating a user poll vote
    // Adjust the properties and validation rules according to your needs
    userId: Joi.number().integer().min(1).required(),
    pollOptionId: Joi.number().integer().min(1).required(),
  })
);

// Validation middleware for deleting a user poll vote
export const validateUserPollVoteDelete = validate(
  Joi.object({
    // Define the schema for deleting a user poll vote
    userPollVoteId: Joi.number().integer().min(1).required(),
  })
);

// Validation middleware for getting user poll votes by userId
export const validateUserPollVoteGetByUserId = validate(
  Joi.object({
    // Define the schema for getting user poll votes by userId
    userId: Joi.number().integer().min(1).required(),
  })
);
