import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for creating an announcement
export const validateAnnouncementCreate = validate(
  Joi.object({
    // Define the schema for creating an announcement
    // Adjust the properties and validation rules according to your needs
    title: Joi.string().trim().required(),
    content: Joi.string().trim().required(),
    // Add more properties as needed
  })
);

// Validation middleware for updating an announcement
export const validateAnnouncementUpdate = validate(
  Joi.object({
    // Define the schema for updating an announcement
    announcementId: Joi.number().integer().min(1).required(),
    // Adjust the properties and validation rules according to your needs
    title: Joi.string().trim(),
    content: Joi.string().trim(),
    // Add more properties as needed
  }).min(1)
); // At least one property is required for an update

// Validation middleware for deleting an announcement
export const validateAnnouncementDelete = validate(
  Joi.object({
    // Define the schema for deleting an announcement
    announcementId: Joi.number().integer().min(1).required(),
  })
);
