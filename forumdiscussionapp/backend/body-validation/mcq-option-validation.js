const Joi = require('joi');
const { validate } = require('../authvalid');

// Validation middleware for creating an MCQ option
const validateMCQOptionCreate = validate(Joi.object({
  // Define the schema for creating an MCQ option
  // Adjust the properties and validation rules according to your needs
  questionId: Joi.number().integer().min(1).required(),
  text: Joi.string().trim().required(),
  isCorrect: Joi.boolean().required(),
  // Add more properties as needed
}));

// Validation middleware for updating an MCQ option
const validateMCQOptionUpdate = validate(Joi.object({
  // Define the schema for updating an MCQ option
  // Adjust the properties and validation rules according to your needs
  mcqOptionId: Joi.number().integer().min(1).required(),
  text: Joi.string().trim().required(),
  isCorrect: Joi.boolean().required(),
  // Add more properties as needed
}));

// Validation middleware for deleting an MCQ option
const validateMCQOptionDelete = validate(Joi.object({
  // Define the schema for deleting an MCQ option
  mcqOptionId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateMCQOptionCreate,
  validateMCQOptionUpdate,
  validateMCQOptionDelete,
};
