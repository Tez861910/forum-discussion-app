const Joi = require('joi');
const { validate } = require('../authvalid');

// Validation middleware for creating a question type
const validateQuestionTypeCreate = validate(Joi.object({
  // Define the schema for creating a question type
  // Adjust the properties and validation rules according to your needs
  typeName: Joi.string().trim().required(),
  // Add more properties as needed
}));

// Validation middleware for updating a question type
const validateQuestionTypeUpdate = validate(Joi.object({
  // Define the schema for updating a question type
  // Adjust the properties and validation rules according to your needs
  questionTypeId: Joi.number().integer().min(1).required(),
  typeName: Joi.string().trim().required(),
  // Add more properties as needed
}));

// Validation middleware for deleting a question type
const validateQuestionTypeDelete = validate(Joi.object({
  // Define the schema for deleting a question type
  questionTypeId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateQuestionTypeCreate,
  validateQuestionTypeUpdate,
  validateQuestionTypeDelete,
};
