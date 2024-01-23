import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for event creation
export const validateEventCreate = validate(
  Joi.object({
    // Define the required properties for event creation
    // For example:
    userId: Joi.number().integer().min(1).required(),
    courseId: Joi.number().integer().min(1).required(),
    EventTitle: Joi.string().min(1).required(),
    EventDescription: Joi.string().min(1).required(),
    EventDate: Joi.date().required(),
    Location: Joi.string().min(1).required(),
    // Add more properties as needed
  })
);

// Validation middleware for editing an event
export const validateEventEdit = validate(
  Joi.object({
    // Define the required properties for editing an event
    // For example:
    userId: Joi.number().integer().min(1).required(),
    eventId: Joi.number().integer().min(1).required(),
    EventTitle: Joi.string().min(1).required(),
    EventDescription: Joi.string().min(1).required(),
    EventDate: Joi.date().required(),
    // Add more properties as needed
  })
);

// Validation middleware for deleting an event
export const validateEventDelete = validate(
  Joi.object({
    eventId: Joi.number().integer().min(1).required(),
  })
);
