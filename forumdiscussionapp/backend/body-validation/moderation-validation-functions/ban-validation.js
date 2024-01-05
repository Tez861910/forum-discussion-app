import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for creating a ban
export const validateBanCreate = validate(
  Joi.object({
    // Define the schema for creating a ban
    // Adjust the properties and validation rules according to your needs
    userId: Joi.number().integer().min(1).required(),
    reason: Joi.string().trim().required(),
    // Add more properties as needed
  })
);

// Validation middleware for updating a ban
export const validateBanUpdate = validate(
  Joi.object({
    // Define the schema for updating a ban
    banId: Joi.number().integer().min(1).required(),
    // Adjust the properties and validation rules according to your needs
    reason: Joi.string().trim(),
    // Add more properties as needed
  }).min(1)
); // At least one property is required for an update

// Validation middleware for deleting a ban
export const validateBanDelete = validate(
  Joi.object({
    // Define the schema for deleting a ban
    banId: Joi.number().integer().min(1).required(),
  })
);
