const Joi = require('joi');
const { validate } = require('../../authvalid');

// Validation middleware for creating a user activity log
const validateUserActivityLogCreate = validate(Joi.object({
  // Define the schema for creating a user activity log
  // Adjust the properties and validation rules according to your needs
  userId: Joi.number().integer().min(1).required(),
  activityType: Joi.string().trim().required(),
  // Add more properties as needed
}));

// Validation middleware for updating a user activity log
const validateUserActivityLogUpdate = validate(Joi.object({
  // Define the schema for updating a user activity log
  logId: Joi.number().integer().min(1).required(),
  // Adjust the properties and validation rules according to your needs
  activityType: Joi.string().trim(),
  // Add more properties as needed
}).min(1)); // At least one property is required for an update

// Validation middleware for deleting a user activity log
const validateUserActivityLogDelete = validate(Joi.object({
  // Define the schema for deleting a user activity log
  logId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateUserActivityLogCreate,
  validateUserActivityLogUpdate,
  validateUserActivityLogDelete,
};
