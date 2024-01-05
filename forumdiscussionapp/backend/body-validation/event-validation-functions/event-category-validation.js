import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for creating an event category
export const validateCreateEventCategory = validate(
  Joi.object({
    // Define the required properties for creating an event category
    // For example:
    categoryName: Joi.string().min(1).required(),
    // Add more properties as needed
  })
);

// Validation middleware for editing an event category
export const validateEditEventCategory = validate(
  Joi.object({
    // Define the required properties for editing an event category
    // For example:
    categoryId: Joi.number().integer().min(1).required(),
    categoryName: Joi.string().min(1).required(),
    // Add more properties as needed
  })
);

// Validation middleware for assigning an event category
export const validateAssignEventCategory = validate(
  Joi.object({
    // Define the required properties for assigning an event category
    // For example:
    eventId: Joi.number().integer().min(1).required(),
    categoryId: Joi.number().integer().min(1).required(),
    // Add more properties as needed
  })
);

// Validation middleware for editing an assigned event category
export const validateEditAssignedEventCategory = validate(
  Joi.object({
    // Define the required properties for editing an assigned event category
    // For example:
    eventId: Joi.number().integer().min(1).required(),
    categoryId: Joi.number().integer().min(1).required(),
    newCategoryName: Joi.string().min(1).required(),
    // Add more properties as needed
  })
);
