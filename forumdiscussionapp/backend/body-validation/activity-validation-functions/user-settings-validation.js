import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for creating user settings
export const validateUserSettingsCreate = validate(
  Joi.object({
    // Define the schema for creating user settings
    // Adjust the properties and validation rules according to your needs
    userId: Joi.number().integer().min(1).required(),
    settingName: Joi.string().trim().required(),
    settingValue: Joi.string().trim().required(),
    // Add more properties as needed
  })
);

// Validation middleware for updating user settings
export const validateUserSettingsUpdate = validate(
  Joi.object({
    // Define the schema for updating user settings
    settingId: Joi.number().integer().min(1).required(),
    // Adjust the properties and validation rules according to your needs
    settingValue: Joi.string().trim(),
    // Add more properties as needed
  }).min(1)
); // At least one property is required for an update

// Validation middleware for deleting user settings
export const validateUserSettingsDelete = validate(
  Joi.object({
    // Define the schema for deleting user settings
    settingId: Joi.number().integer().min(1).required(),
  })
);
