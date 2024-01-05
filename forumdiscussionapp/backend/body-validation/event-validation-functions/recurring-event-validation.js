import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for creating a recurring event
export const validateCreateRecurringEvent = validate(
  Joi.object({
    // Define the required properties for creating a recurring event
    // For example:
    eventId: Joi.number().integer().min(1).required(),
    recurrencePattern: Joi.string().required(),
    // Add more properties as needed
  })
);

// Validation middleware for editing a recurring event
export const validateEditRecurringEvent = validate(
  Joi.object({
    // Define the required properties for editing a recurring event
    // For example:
    eventId: Joi.number().integer().min(1).required(),
    recurringEventId: Joi.number().integer().min(1).required(),
    newRecurrencePattern: Joi.string().required(),
    // Add more properties as needed
  })
);

// Validation middleware for soft deleting a recurring event
export const validateSoftDeleteRecurringEvent = validate(
  Joi.object({
    // Define the required properties for soft deleting a recurring event
    // For example:
    eventId: Joi.number().integer().min(1).required(),
    recurringEventId: Joi.number().integer().min(1).required(),
  })
);
