const Joi = require('joi');
const { validate } = require('../../authvalid');

// Validation middleware for creating a read receipt for group message
const validateReadReceiptGroupCreate = validate(Joi.object({
  // Define the schema for creating a read receipt for group message
  // Add properties such as userId, groupId, messageId, etc. based on your requirements
  userId: Joi.number().integer().min(1).required(),
  groupId: Joi.number().integer().min(1).required(),
  messageId: Joi.number().integer().min(1).required(),
  // Add more properties as needed
}));

// Validation middleware for getting a read receipt for group message by ID
const validateReadReceiptGroupGet = validate(Joi.object({
  // Define the schema for getting a read receipt for group message by ID
  receiptId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateReadReceiptGroupCreate,
  validateReadReceiptGroupGet,
};