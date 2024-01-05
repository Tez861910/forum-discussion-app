const Joi = require('joi');
const { validate } = require('../../authvalid');

// Validation middleware for creating a notification
const validateNotificationCreate = validate(Joi.object({
  // Define the schema for creating a notification
  // Adjust the properties and validation rules according to your needs
  title: Joi.string().trim().required(),
  message: Joi.string().trim().required(),
  userId: Joi.number().integer().min(1).required(),
  // Add more properties as needed
}));

// Validation middleware for updating a notification
const validateNotificationUpdate = validate(Joi.object({
  // Define the schema for updating a notification
  notificationId: Joi.number().integer().min(1).required(),
  // Adjust the properties and validation rules according to your needs
  title: Joi.string().trim(),
  message: Joi.string().trim(),
  // Add more properties as needed
}).min(1)); // At least one property is required for an update

// Validation middleware for deleting a notification
const validateNotificationDelete = validate(Joi.object({
  // Define the schema for deleting a notification
  notificationId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateNotificationCreate,
  validateNotificationUpdate,
  validateNotificationDelete,
};
