const Joi = require('joi');
const { validate } = require('../../authvalid');

// Validation middleware for creating a reaction
const validateReactionCreate = validate(Joi.object({
  // Define the schema for creating a reaction
  // Adjust the properties and validation rules according to your needs
  userId: Joi.number().integer().min(1).required(),
  postId: Joi.number().integer().min(1).required(),
  reactionTypeId: Joi.number().integer().min(1).required(),
  // Add more properties as needed
}));

// Validation middleware for updating a reaction
const validateReactionUpdate = validate(Joi.object({
  // Define the schema for updating a reaction
  reactionId: Joi.number().integer().min(1).required(),
  // Adjust the properties and validation rules according to your needs
  userId: Joi.number().integer().min(1),
  postId: Joi.number().integer().min(1),
  reactionTypeId: Joi.number().integer().min(1),
  // Add more properties as needed
}).min(1)); // At least one property is required for an update

// Validation middleware for deleting a reaction
const validateReactionDelete = validate(Joi.object({
  // Define the schema for deleting a reaction
  reactionId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateReactionCreate,
  validateReactionUpdate,
  validateReactionDelete,
};
