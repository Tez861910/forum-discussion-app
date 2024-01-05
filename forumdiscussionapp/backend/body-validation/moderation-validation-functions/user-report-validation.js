const Joi = require('joi');
const { validate } = require('../../authvalid');

// Validation middleware for creating a user report
const validateUserReportCreate = validate(Joi.object({
  // Define the schema for creating a user report
  // Adjust the properties and validation rules according to your needs
  userId: Joi.number().integer().min(1).required(),
  reportedUserId: Joi.number().integer().min(1).required(),
  reason: Joi.string().trim().required(),
  // Add more properties as needed
}));

// Validation middleware for updating a user report
const validateUserReportUpdate = validate(Joi.object({
  // Define the schema for updating a user report
  reportId: Joi.number().integer().min(1).required(),
  // Adjust the properties and validation rules according to your needs
  reason: Joi.string().trim(),
  // Add more properties as needed
}).min(1)); // At least one property is required for an update

// Validation middleware for deleting a user report
const validateUserReportDelete = validate(Joi.object({
  // Define the schema for deleting a user report
  reportId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateUserReportCreate,
  validateUserReportUpdate,
  validateUserReportDelete,
};
