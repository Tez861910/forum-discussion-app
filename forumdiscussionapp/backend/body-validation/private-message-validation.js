const Joi = require('joi');
const { validate } = require('../authvalid');

// Validation middleware for creating a private message
const validatePrivateMessageCreate = validate(Joi.object({
  // Define the schema for creating a private message
  // Adjust the properties and validation rules according to your needs
  senderId: Joi.number().integer().min(1).required(),
  recipientId: Joi.number().integer().min(1).required(),
  messageContent: Joi.string().trim().required(),
  // Add more properties as needed
}));

// Validation middleware for updating a private message
const validatePrivateMessageUpdate = validate(Joi.object({
  // Define the schema for updating a private message
  // Adjust the properties and validation rules according to your needs
  messageId: Joi.number().integer().min(1).required(),
  messageContent: Joi.string().trim().required(),
  // Add more properties as needed
}));

// Validation middleware for deleting a private message
const validatePrivateMessageDelete = validate(Joi.object({
  // Define the schema for deleting a private message
  messageId: Joi.number().integer().min(1).required(),
}));

// Validation middleware for getting private messages by user
const validatePrivateMessagesGetByUser = validate(Joi.object({
  // Define the schema for getting private messages by user
  userId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validatePrivateMessageCreate,
  validatePrivateMessageUpdate,
  validatePrivateMessageDelete,
  validatePrivateMessagesGetByUser,
};
