const Joi = require('joi');
const { validate } = require('../../authvalid');

// Validation middleware for creating a recurring event
const validateCreateRecurringEvent = validate(Joi.object({
  // Define the required properties for creating a recurring event
  // For example:
  eventId: Joi.number().integer().min(1).required(),
  recurrencePattern: Joi.string().required(),
  // Add more properties as needed
}));

// Validation middleware for editing a recurring event
const validateEditRecurringEvent = validate(Joi.object({
  // Define the required properties for editing a recurring event
  // For example:
  eventId: Joi.number().integer().min(1).required(),
  recurringEventId: Joi.number().integer().min(1).required(),
  newRecurrencePattern: Joi.string().required(),
  // Add more properties as needed
}));

// Validation middleware for soft deleting a recurring event
const validateSoftDeleteRecurringEvent = validate(Joi.object({
  // Define the required properties for soft deleting a recurring event
  // For example:
  eventId: Joi.number().integer().min(1).required(),
  recurringEventId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateCreateRecurringEvent,
  validateEditRecurringEvent,
  validateSoftDeleteRecurringEvent,
  // Add more exported validation middleware as needed
};
