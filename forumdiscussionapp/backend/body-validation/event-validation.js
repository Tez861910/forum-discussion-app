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

// Validation middleware for assigning event category
const validateAssignEventCategory = validate(Joi.object({
  // Define the required properties for assigning an event category
  // For example:
  eventId: Joi.number().integer().min(1).required(),
  categoryId: Joi.number().integer().min(1).required(),
}));

// Validation middleware for creating recurring events
const validateCreateRecurringEvent = validate(Joi.object({
  // Define the required properties for creating recurring events
  // For example:
  eventId: Joi.number().integer().min(1).required(),
  recurrencePattern: Joi.string().required(),
  // Add more properties as needed
}));

// Validation middleware for creating reminders
const validateCreateReminder = validate(Joi.object({
  // Define the required properties for creating reminders
  // For example:
  eventId: Joi.number().integer().min(1).required(),
  reminderTime: Joi.date().required(),
  // Add more properties as needed
}));

// Validation middleware for creating guest speakers
const validateCreateGuestSpeaker = validate(Joi.object({
  // Define the required properties for creating guest speakers
  // For example:
  eventId: Joi.number().integer().min(1).required(),
  speakerName: Joi.string().min(1).required(),
  // Add more properties as needed
}));

module.exports = {
  validateEventCreate,
  validateEventEdit,
  validateAssignEventCategory,
  validateCreateRecurringEvent,
  validateCreateReminder,
  validateCreateGuestSpeaker,
  // Add more exported validation middleware as needed
};
