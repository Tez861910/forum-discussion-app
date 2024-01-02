const Joi = require('joi');
const { validate } = require('../authvalid');

// Validation middleware for creating a poll option
const validatePollOptionCreate = validate(Joi.object({
  // Define the schema for creating a poll option
  // Adjust the properties and validation rules according to your needs
  pollId: Joi.number().integer().min(1).required(),
  optionText: Joi.string().trim().required(),
}));

// Validation middleware for updating a poll option
const validatePollOptionUpdate = validate(Joi.object({
  // Define the schema for updating a poll option
  // Adjust the properties and validation rules according to your needs
  pollOptionId: Joi.number().integer().min(1).required(),
  optionText: Joi.string().trim(),
}));

// Validation middleware for deleting a poll option
const validatePollOptionDelete = validate(Joi.object({
  // Define the schema for deleting a poll option
  pollOptionId: Joi.number().integer().min(1).required(),
}));

// Validation middleware for getting poll options by pollId
const validatePollOptionGetByPollId = validate(Joi.object({
  // Define the schema for getting poll options by pollId
  pollId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validatePollOptionCreate,
  validatePollOptionUpdate,
  validatePollOptionDelete,
  validatePollOptionGetByPollId,
};
