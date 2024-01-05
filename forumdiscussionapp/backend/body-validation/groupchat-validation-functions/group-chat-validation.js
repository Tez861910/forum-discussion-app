import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for creating a group chat
export const validateGroupChatCreate = validate(
  Joi.object({
    // Define the schema for creating a group chat
    // Adjust the properties and validation rules according to your needs
    groupName: Joi.string().trim().min(3).max(255).required(),
    // Add more properties as needed
  })
);

// Validation middleware for updating a group chat
export const validateGroupChatUpdate = validate(
  Joi.object({
    // Define the schema for updating a group chat
    // Adjust the properties and validation rules according to your needs
    groupId: Joi.number().integer().min(1).required(),
    groupName: Joi.string().trim().min(3).max(255).required(),
    // Add more properties as needed
  })
);

// Validation middleware for deleting a group chat
export const validateGroupChatDelete = validate(
  Joi.object({
    // Define the schema for deleting a group chat
    groupId: Joi.number().integer().min(1).required(),
  })
);

// Validation middleware for getting a group chat by ID
export const validateGroupChatGetById = validate(
  Joi.object({
    // Define the schema for getting a group chat by ID
    groupId: Joi.number().integer().min(1).required(),
  })
);

// Validation middleware for getting a group chat by name
export const validateGroupChatGetByName = validate(
  Joi.object({
    // Define the schema for getting a group chat by name
    groupName: Joi.string().trim().min(3).max(255).required(),
  })
);
