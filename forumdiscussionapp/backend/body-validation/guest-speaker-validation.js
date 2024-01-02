const Joi = require('joi');
const { validate } = require('../authvalid');

// Validation middleware for creating a guest speaker
const validateCreateGuestSpeaker = validate(Joi.object({
  // Define the required properties for creating a guest speaker
  // For example:
  eventId: Joi.number().integer().min(1).required(),
  speakerName: Joi.string().min(1).required(),
  // Add more properties as needed
}));

// Validation middleware for editing a guest speaker
const validateEditGuestSpeaker = validate(Joi.object({
  // Define the required properties for editing a guest speaker
  // For example:
  eventId: Joi.number().integer().min(1).required(),
  guestSpeakerId: Joi.number().integer().min(1).required(),
  newSpeakerName: Joi.string().min(1).required(),
  // Add more properties as needed
}));

// Validation middleware for soft deleting a guest speaker
const validateSoftDeleteGuestSpeaker = validate(Joi.object({
  // Define the required properties for soft deleting a guest speaker
  // For example:
  eventId: Joi.number().integer().min(1).required(),
  guestSpeakerId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateCreateGuestSpeaker,
  validateEditGuestSpeaker,
  validateSoftDeleteGuestSpeaker,
  // Add more exported validation middleware as needed
};
