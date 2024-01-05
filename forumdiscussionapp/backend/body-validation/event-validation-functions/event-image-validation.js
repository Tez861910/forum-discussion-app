import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for creating a new event image
export const validateImageCreate = validate(
  Joi.object({
    // Define the schema for creating a new event image
    eventId: Joi.number().integer().min(1).required(),
    imageURL: Joi.string().uri().required(),
    // Add more properties as needed
  })
);

// Validation middleware for updating an event image by ID
export const validateImageUpdate = validate(
  Joi.object({
    // Define the schema for updating an event image by ID
    imageId: Joi.number().integer().min(1).required(),
    eventId: Joi.number().integer().min(1),
    imageURL: Joi.string().uri(),
    // Add more properties as needed
  })
);

// Validation middleware for deleting an event image by ID
export const validateImageDelete = validate(
  Joi.object({
    // Define the schema for deleting an event image by ID
    imageId: Joi.number().integer().min(1).required(),
  })
);
