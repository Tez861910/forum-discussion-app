const Joi = require('joi');
const { validate } = require('../../authvalid');

// Validation middleware for creating a forum post
const validateForumPostCreate = validate(Joi.object({
  // Define the schema for creating a forum post
  // Adjust the properties and validation rules according to your needs
  title: Joi.string().required(),
  content: Joi.string().required(),
}));

// Validation middleware for updating a forum post
const validateForumPostUpdate = validate(Joi.object({
  // Define the schema for updating a forum post
  // Adjust the properties and validation rules according to your needs
  title: Joi.string(),
  content: Joi.string(),
}));

// Validation middleware for deleting a forum post
const validateForumPostDelete = validate(Joi.object({
  // Define the schema for deleting a forum post
  forumPostId: Joi.number().integer().min(1).required(),
}));

// Validation middleware for getting forum posts for a specific forum
const validateForumPostGetForumId = validate(Joi.object({
  // Define the schema for getting forum posts for a specific forum
  forumId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateForumPostCreate,
  validateForumPostUpdate,
  validateForumPostDelete,
  validateForumPostGetForumId,
};
