import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for creating a new gender
export const validateGenderCreate = validate(
  Joi.object({
    // Define the schema for creating a new gender
    genderName: Joi.string().trim().required(),
    // Add more properties as needed
  })
);

// Validation middleware for updating a gender by ID
export const validateGenderUpdate = validate(
  Joi.object({
    // Define the schema for updating a gender by ID
    genderId: Joi.number().integer().min(1).required(),
    genderName: Joi.string().trim().required(),
    // Add more properties as needed
  })
);

// Validation middleware for deleting a gender by ID
export const validateGenderDelete = validate(
  Joi.object({
    // Define the schema for deleting a gender by ID
    genderId: Joi.number().integer().min(1).required(),
  })
);
