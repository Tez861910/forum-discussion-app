const Joi = require('joi');
const { validate } = require('../../authvalid');

// Validation middleware for creating a new exam category
const validateCategoryCreate = validate(Joi.object({
  // Define the schema for creating a new exam category
  categoryName: Joi.string().trim().required(),
  // Add more properties as needed
}));

// Validation middleware for updating an exam category by ID
const validateCategoryUpdate = validate(Joi.object({
  // Define the schema for updating an exam category by ID
  categoryId: Joi.number().integer().min(1).required(),
  categoryName: Joi.string().trim().required(),
  // Add more properties as needed
}));

// Validation middleware for deleting an exam category by ID
const validateCategoryDelete = validate(Joi.object({
  // Define the schema for deleting an exam category by ID
  categoryId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateCategoryCreate,
  validateCategoryUpdate,
  validateCategoryDelete,
};
