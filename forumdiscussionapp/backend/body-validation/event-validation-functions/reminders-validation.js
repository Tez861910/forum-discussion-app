import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for creating a reminder
export const validateCreateReminder = validate(
  Joi.object({
    // Define the required properties for creating a reminder
    // For example:
    eventId: Joi.number().integer().min(1).required(),
    reminderTime: Joi.date().required(),
    // Add more properties as needed
  })
);

// Validation middleware for editing a reminder
export const validateEditReminder = validate(
  Joi.object({
    // Define the required properties for editing a reminder
    // For example:
    eventId: Joi.number().integer().min(1).required(),
    reminderId: Joi.number().integer().min(1).required(),
    newReminderTime: Joi.date().required(),
    // Add more properties as needed
  })
);

// Validation middleware for soft deleting a reminder
export const validateSoftDeleteReminder = validate(
  Joi.object({
    // Define the required properties for soft deleting a reminder
    // For example:
    eventId: Joi.number().integer().min(1).required(),
    reminderId: Joi.number().integer().min(1).required(),
  })
);
