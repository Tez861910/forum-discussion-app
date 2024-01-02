const Joi = require('joi');
const { validate } = require('../authvalid');

// Validation middleware for event creation
const validateEventCreate = validate(Joi.object({
  // Define the required properties for event creation
  // For example:
  title: Joi.string().min(1).required(),
  date: Joi.date().required(),
  // Add more properties as needed
}));

// Validation middleware for editing an event
const validateEventEdit = validate(Joi.object({
  // Define the required properties for editing an event
  // For example:
  eventId: Joi.number().integer().min(1).required(),
  title: Joi.string().min(1).required(),
  date: Joi.date().required(),
  // Add more properties as needed
}));

// Validation middleware for deleting an event
const validateEventDelete = validate(Joi.object({
  eventId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateEventCreate,
  validateEventEdit,
  validateEventDelete,
  // Add more exported validation middleware as needed
};
