import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for creating a question type
export const validateQuestionTypeCreate = validate(
  Joi.object({
    // Define the schema for creating a question type
    // Adjust the properties and validation rules according to your needs
    typeName: Joi.string().trim().required(),
    // Add more properties as needed
  })
);

// Validation middleware for updating a question type
export const validateQuestionTypeUpdate = validate(
  Joi.object({
    // Define the schema for updating a question type
    // Adjust the properties and validation rules according to your needs
    questionTypeId: Joi.number().integer().min(1).required(),
    typeName: Joi.string().trim().required(),
    // Add more properties as needed
  })
);

// Validation middleware for deleting a question type
export const validateQuestionTypeDelete = validate(
  Joi.object({
    // Define the schema for deleting a question type
    questionTypeId: Joi.number().integer().min(1).required(),
  })
);
