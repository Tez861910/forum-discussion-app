import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for creating a question
export const validateQuestionCreate = validate(
  Joi.object({
    // Define the schema for creating a question
    // Adjust the properties and validation rules according to your needs
    text: Joi.string().trim().required(),
    // Add more properties as needed
  })
);

// Validation middleware for updating a question
export const validateQuestionUpdate = validate(
  Joi.object({
    // Define the schema for updating a question
    // Adjust the properties and validation rules according to your needs
    questionId: Joi.number().integer().min(1).required(),
    text: Joi.string().trim().required(),
    // Add more properties as needed
  })
);

// Validation middleware for deleting a question
export const validateQuestionDelete = validate(
  Joi.object({
    // Define the schema for deleting a question
    questionId: Joi.number().integer().min(1).required(),
  })
);
