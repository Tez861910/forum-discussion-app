import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for creating a real-time update for a group
export const validateRealTimeGroupUpdateCreate = validate(
  Joi.object({
    // Define the schema for creating a real-time update for a group
    // Add properties such as groupId, userId, updateMessage, etc. based on your requirements
    groupId: Joi.number().integer().min(1).required(),
    userId: Joi.number().integer().min(1).required(),
    updateMessage: Joi.string().required(),
    // Add more properties as needed
  })
);

// Validation middleware for getting a real-time update for a group by ID
export const validateRealTimeGroupUpdateGet = validate(
  Joi.object({
    // Define the schema for getting a real-time update for a group by ID
    updateId: Joi.number().integer().min(1).required(),
  })
);
