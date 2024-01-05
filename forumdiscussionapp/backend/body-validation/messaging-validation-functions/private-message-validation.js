import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for creating a private message
export const validatePrivateMessageCreate = validate(
  Joi.object({
    // Define the schema for creating a private message
    // Adjust the properties and validation rules according to your needs
    senderId: Joi.number().integer().min(1).required(),
    recipientId: Joi.number().integer().min(1).required(),
    messageContent: Joi.string().trim().required(),
    // Add more properties as needed
  })
);

// Validation middleware for updating a private message
export const validatePrivateMessageUpdate = validate(
  Joi.object({
    // Define the schema for updating a private message
    // Adjust the properties and validation rules according to your needs
    messageId: Joi.number().integer().min(1).required(),
    messageContent: Joi.string().trim().required(),
    // Add more properties as needed
  })
);

// Validation middleware for deleting a private message
export const validatePrivateMessageDelete = validate(
  Joi.object({
    // Define the schema for deleting a private message
    messageId: Joi.number().integer().min(1).required(),
  })
);

// Validation middleware for getting private messages by user
export const validatePrivateMessagesGetByUser = validate(
  Joi.object({
    // Define the schema for getting private messages by user
    userId: Joi.number().integer().min(1).required(),
  })
);
