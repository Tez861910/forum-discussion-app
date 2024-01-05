const Joi = require('joi');
const { validate } = require('../../authvalid');

// Validation middleware for creating a user response
const validateUserResponseCreate = validate(Joi.object({
  // Define the schema for creating a user response
  // Adjust the properties and validation rules according to your needs
  questionId: Joi.number().integer().min(1).required(),
  userId: Joi.number().integer().min(1).required(),
  response: Joi.string().trim().required(),
  // Add more properties as needed
}));

// Validation middleware for updating a user response
const validateUserResponseUpdate = validate(Joi.object({
  // Define the schema for updating a user response
  // Adjust the properties and validation rules according to your needs
  userResponseId: Joi.number().integer().min(1).required(),
  response: Joi.string().trim().required(),
  // Add more properties as needed
}));

// Validation middleware for deleting a user response
const validateUserResponseDelete = validate(Joi.object({
  // Define the schema for deleting a user response
  userResponseId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateUserResponseCreate,
  validateUserResponseUpdate,
  validateUserResponseDelete,
};
