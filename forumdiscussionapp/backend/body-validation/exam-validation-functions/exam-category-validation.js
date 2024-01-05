import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for creating a new exam category
export const validateCategoryCreate = validate(
  Joi.object({
    // Define the schema for creating a new exam category
    categoryName: Joi.string().trim().required(),
    // Add more properties as needed
  })
);

// Validation middleware for updating an exam category by ID
export const validateCategoryUpdate = validate(
  Joi.object({
    // Define the schema for updating an exam category by ID
    categoryId: Joi.number().integer().min(1).required(),
    categoryName: Joi.string().trim().required(),
    // Add more properties as needed
  })
);

// Validation middleware for deleting an exam category by ID
export const validateCategoryDelete = validate(
  Joi.object({
    // Define the schema for deleting an exam category by ID
    categoryId: Joi.number().integer().min(1).required(),
  })
);
