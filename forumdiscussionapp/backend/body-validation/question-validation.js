const Joi = require('joi');
const { validate } = require('../authvalid');

// Validation middleware for creating a question
const validateQuestionCreate = validate(Joi.object({
  // Define the schema for creating a question
  // Adjust the properties and validation rules according to your needs
  text: Joi.string().trim().required(),
  // Add more properties as needed
}));

// Validation middleware for updating a question
const validateQuestionUpdate = validate(Joi.object({
  // Define the schema for updating a question
  // Adjust the properties and validation rules according to your needs
  questionId: Joi.number().integer().min(1).required(),
  text: Joi.string().trim().required(),
  // Add more properties as needed
}));

// Validation middleware for deleting a question
const validateQuestionDelete = validate(Joi.object({
  // Define the schema for deleting a question
  questionId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateQuestionCreate,
  validateQuestionUpdate,
  validateQuestionDelete,
};
