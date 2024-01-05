const Joi = require('joi');
const { validate } = require('../../authvalid');

// Validation middleware for response creation
const validateResponseCreate = validate(Joi.object({
  // Define the required properties for response creation
  // For example:
  commentId: Joi.number().integer().min(1).required(),
  content: Joi.string().min(1).required(),
  // Add more properties as needed
}));

// Validation middleware for updating a response
const validateResponseUpdate = validate(Joi.object({
  // Define the required properties for updating a response
  // For example:
  responseId: Joi.number().integer().min(1).required(),
  content: Joi.string().min(1).required(),
  // Add more properties as needed
}));

// Validation middleware for deleting a response
const validateResponseDelete = validate(Joi.object({
  // Define the required properties for deleting a response
  // For example:
  responseId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateResponseCreate,
  validateResponseUpdate,
  validateResponseDelete,
  // Add more exported validation middleware as needed
};