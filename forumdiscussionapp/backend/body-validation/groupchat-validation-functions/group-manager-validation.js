import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for creating a group manager
export const validateManagerCreate = validate(
  Joi.object({
    // Define the schema for creating a group manager
    // Add properties such as userId, groupId, permissions, etc. based on your requirements
    userId: Joi.number().integer().min(1).required(),
    groupId: Joi.number().integer().min(1).required(),
    permissions: Joi.array().items(Joi.string()).required(),
    // Add more properties as needed
  })
);

// Validation middleware for updating a group manager by ID
export const validateManagerUpdate = validate(
  Joi.object({
    // Define the schema for updating a group manager by ID
    managerId: Joi.number().integer().min(1).required(),
    // Add properties that can be updated, e.g., permissions
    permissions: Joi.array().items(Joi.string()).required(),
    // Add more properties as needed
  })
);

// Validation middleware for deleting a group manager by ID
export const validateManagerDelete = validate(
  Joi.object({
    // Define the schema for deleting a group manager by ID
    managerId: Joi.number().integer().min(1).required(),
  })
);

// Validation middleware for getting a group manager by ID
export const validateManagerGet = validate(
  Joi.object({
    // Define the schema for getting a group manager by ID
    managerId: Joi.number().integer().min(1).required(),
  })
);
