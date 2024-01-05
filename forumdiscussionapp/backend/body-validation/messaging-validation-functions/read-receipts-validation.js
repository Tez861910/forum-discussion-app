const Joi = require('joi');
const { validate } = require('../../authvalid');

// Validation middleware for creating a read receipt
const validateReceiptCreate = validate(Joi.object({
  // Define the schema for creating a read receipt
  // Add properties such as userId, messageId, timestamp, etc. based on your requirements
  userId: Joi.number().integer().min(1).required(),
  messageId: Joi.number().integer().min(1).required(),
  timestamp: Joi.date().iso().required(),
  // Add more properties as needed
}));

// Validation middleware for getting a read receipt by ID
const validateReceiptGet = validate(Joi.object({
  // Define the schema for getting a read receipt by ID
  receiptId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateReceiptCreate,
  validateReceiptGet,
};
