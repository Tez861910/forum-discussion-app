const Joi = require('joi');
const { validate } = require('../authvalid');

// Validation middleware for creating a forum moderator
const validateForumModeratorCreate = validate(Joi.object({
  // Define the schema for creating a forum moderator
  // Adjust the properties and validation rules according to your needs
  forumId: Joi.number().integer().min(1).required(),
  userId: Joi.number().integer().min(1).required(),
}));

// Validation middleware for updating a forum moderator
const validateForumModeratorUpdate = validate(Joi.object({
  // Define the schema for updating a forum moderator
  // Adjust the properties and validation rules according to your needs
  forumModeratorId: Joi.number().integer().min(1).required(),
  forumId: Joi.number().integer().min(1),
  userId: Joi.number().integer().min(1),
}));

// Validation middleware for deleting a forum moderator
const validateForumModeratorDelete = validate(Joi.object({
  // Define the schema for deleting a forum moderator
  forumModeratorId: Joi.number().integer().min(1).required(),
}));

// Validation middleware for getting forum moderators for a specific user
const validateForumModeratorGetUserId = validate(Joi.object({
  // Define the schema for getting forum moderators for a specific user
  userId: Joi.number().integer().min(1).required(),
}));

// Validation middleware for getting forum moderators for a specific forum
const validateForumModeratorGetForumId = validate(Joi.object({
  // Define the schema for getting forum moderators for a specific forum
  forumId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateForumModeratorCreate,
  validateForumModeratorUpdate,
  validateForumModeratorDelete,
  validateForumModeratorGetUserId,
  validateForumModeratorGetForumId,
};
