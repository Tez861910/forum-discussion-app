const Joi = require('joi');
const { validate } = require('../../authvalid');

// Validation middleware for creating an attachment
const validateAttachmentCreate = validate(Joi.object({
  // Define the schema for creating an attachment
  // Adjust the properties and validation rules according to your needs
  fileName: Joi.string().required(),
  fileType: Joi.string().required(),
  // Add more properties as needed
}));

// Validation middleware for updating an attachment
const validateAttachmentUpdate = validate(Joi.object({
  // Define the schema for updating an attachment
  attachmentId: Joi.number().integer().min(1).required(),
  fileName: Joi.string(),
  fileType: Joi.string(),
  // Add more properties as needed
}).min(1)); // At least one property is required for an update

// Validation middleware for deleting an attachment
const validateAttachmentDelete = validate(Joi.object({
  // Define the schema for deleting an attachment
  attachmentId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateAttachmentCreate,
  validateAttachmentUpdate,
  validateAttachmentDelete,
};