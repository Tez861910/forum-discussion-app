const Joi = require('joi');
const { validate } = require('../authvalid');

// Validation middleware for creating a forum reply
const validateForumReplyCreate = validate(Joi.object({
  // Define the schema for creating a forum reply
  // Adjust the properties and validation rules according to your needs
  content: Joi.string().required(),
}));

// Validation middleware for updating a forum reply
const validateForumReplyUpdate = validate(Joi.object({
  // Define the schema for updating a forum reply
  // Adjust the properties and validation rules according to your needs
  content: Joi.string().required(),
}));

// Validation middleware for deleting a forum reply
const validateForumReplyDelete = validate(Joi.object({
  // Define the schema for deleting a forum reply
  forumReplyId: Joi.number().integer().min(1).required(),
}));

// Validation middleware for getting forum replies for a specific forum post
const validateForumReplyGetForumPostId = validate(Joi.object({
  // Define the schema for getting forum replies for a specific forum post
  forumPostId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateForumReplyCreate,
  validateForumReplyUpdate,
  validateForumReplyDelete,
  validateForumReplyGetForumPostId,
};
