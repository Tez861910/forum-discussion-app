import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for creating an exam
export const validateExamCreate = validate(
  Joi.object({
    // Define the schema for creating an exam
    // Adjust the properties and validation rules according to your needs
    courseId: Joi.number().integer().min(1).required(),
    examName: Joi.string().trim().required(),
    // Add more properties as needed
  })
);

// Validation middleware for updating an exam
export const validateExamUpdate = validate(
  Joi.object({
    // Define the schema for updating an exam
    // Adjust the properties and validation rules according to your needs
    examId: Joi.number().integer().min(1).required(),
    examName: Joi.string().trim().required(),
    // Add more properties as needed
  })
);

// Validation middleware for deleting an exam
export const validateExamDelete = validate(
  Joi.object({
    // Define the schema for deleting an exam
    examId: Joi.number().integer().min(1).required(),
  })
);

// Validation middleware for getting exams by courseId
export const validateExamGetByCourseId = validate(
  Joi.object({
    // Define the schema for getting exams by courseId
    courseId: Joi.number().integer().min(1).required(),
  })
);
