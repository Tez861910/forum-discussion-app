import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for creating an answer
export const validateAnswerCreate = validate(
  Joi.object({
    // Define the schema for creating an answer
    // Adjust the properties and validation rules according to your needs
    questionId: Joi.number().integer().min(1).required(),
    text: Joi.string().trim().required(),
    isCorrect: Joi.boolean().required(),
    // Add more properties as needed
  })
);

// Validation middleware for updating an answer
export const validateAnswerUpdate = validate(
  Joi.object({
    // Define the schema for updating an answer
    // Adjust the properties and validation rules according to your needs
    answerId: Joi.number().integer().min(1).required(),
    text: Joi.string().trim().required(),
    isCorrect: Joi.boolean().required(),
    // Add more properties as needed
  })
);

// Validation middleware for deleting an answer
export const validateAnswerDelete = validate(
  Joi.object({
    // Define the schema for deleting an answer
    answerId: Joi.number().integer().min(1).required(),
  })
);
