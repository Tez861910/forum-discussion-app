import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for creating a new course material
export const validateCourseMaterialCreate = validate(
  Joi.object({
    // Define the schema for creating a new course material
    courseId: Joi.number().integer().min(1).required(),
    materialTitle: Joi.string().required(),
    materialContent: Joi.string().required(),
    // Add more properties as needed
  })
);

// Validation middleware for updating a course material
export const validateCourseMaterialUpdate = validate(
  Joi.object({
    // Define the schema for updating a course material
    materialId: Joi.number().integer().min(1).required(),
    courseId: Joi.number().integer().min(1),
    materialTitle: Joi.string(),
    materialContent: Joi.string(),
    // Add more properties as needed
  })
);

// Validation middleware for deleting a course material
export const validateCourseMaterialDelete = validate(
  Joi.object({
    // Define the schema for deleting a course material
    materialId: Joi.number().integer().min(1).required(),
  })
);

// Validation middleware for getting a course material by ID
export const validateCourseMaterialGet = validate(
  Joi.object({
    // Define the schema for getting a course material by ID
    materialId: Joi.number().integer().min(1).required(),
  })
);
