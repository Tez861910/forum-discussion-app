const Joi = require('joi');
const { validate } = require('../../authvalid');

// Validation middleware for creating a reminder
const validateCreateReminder = validate(Joi.object({
  // Define the required properties for creating a reminder
  // For example:
  eventId: Joi.number().integer().min(1).required(),
  reminderTime: Joi.date().required(),
  // Add more properties as needed
}));

// Validation middleware for editing a reminder
const validateEditReminder = validate(Joi.object({
  // Define the required properties for editing a reminder
  // For example:
  eventId: Joi.number().integer().min(1).required(),
  reminderId: Joi.number().integer().min(1).required(),
  newReminderTime: Joi.date().required(),
  // Add more properties as needed
}));

// Validation middleware for soft deleting a reminder
const validateSoftDeleteReminder = validate(Joi.object({
  // Define the required properties for soft deleting a reminder
  // For example:
  eventId: Joi.number().integer().min(1).required(),
  reminderId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateCreateReminder,
  validateEditReminder,
  validateSoftDeleteReminder,
  // Add more exported validation middleware as needed
};
