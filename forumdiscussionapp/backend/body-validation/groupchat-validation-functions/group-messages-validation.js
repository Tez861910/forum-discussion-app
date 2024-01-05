import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for creating a group message
export const validateGroupMessagesCreate = validate(
  Joi.object({
    // Define the schema for creating a group message
    // Adjust the properties and validation rules according to your needs
    groupId: Joi.number().integer().min(1).required(),
    senderId: Joi.number().integer().min(1).required(),
    messageText: Joi.string().required(),
    // Add more properties as needed
  })
);

// Validation middleware for deleting a group message
export const validateGroupMessagesDelete = validate(
  Joi.object({
    // Define the schema for deleting a group message
    messageId: Joi.number().integer().min(1).required(),
  })
);

// Validation middleware for getting group messages by group ID
export const validateGroupMessagesGetByGroupId = validate(
  Joi.object({
    // Define the schema for getting group messages by group ID
    groupId: Joi.number().integer().min(1).required(),
  })
);

// Validation middleware for getting group messages by sender ID
export const validateGroupMessagesGetBySenderId = validate(
  Joi.object({
    // Define the schema for getting group messages by sender ID
    senderId: Joi.number().integer().min(1).required(),
  })
);
