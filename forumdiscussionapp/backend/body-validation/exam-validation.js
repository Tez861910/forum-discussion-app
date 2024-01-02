const Joi = require('joi');
const { validate } = require('../authvalid');

// Validation middleware for creating an exam
const validateExamCreate = validate(Joi.object({
  // Define the schema for creating an exam
  // Adjust the properties and validation rules according to your needs
  courseId: Joi.number().integer().min(1).required(),
  examName: Joi.string().trim().required(),
  // Add more properties as needed
}));

// Validation middleware for updating an exam
const validateExamUpdate = validate(Joi.object({
  // Define the schema for updating an exam
  // Adjust the properties and validation rules according to your needs
  examId: Joi.number().integer().min(1).required(),
  examName: Joi.string().trim().required(),
  // Add more properties as needed
}));

// Validation middleware for deleting an exam
const validateExamDelete = validate(Joi.object({
  // Define the schema for deleting an exam
  examId: Joi.number().integer().min(1).required(),
}));

// Validation middleware for getting exams by courseId
const validateExamGetByCourseId = validate(Joi.object({
  // Define the schema for getting exams by courseId
  courseId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateExamCreate,
  validateExamUpdate,
  validateExamDelete,
  validateExamGetByCourseId,
};
