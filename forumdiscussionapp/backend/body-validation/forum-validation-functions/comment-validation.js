const Joi = require('joi');
const { validate } = require('../../authvalid');

// Validation middleware for comment creation
const validateCommentCreate = validate(Joi.object({
  // Define the required properties for comment creation
  // For example:
  threadId: Joi.number().integer().min(1).required(),
  content: Joi.string().min(1).required(),
  // Add more properties as needed
}));

// Validation middleware for updating a comment
const validateCommentUpdate = validate(Joi.object({
  // Define the required properties for updating a comment
  // For example:
  commentId: Joi.number().integer().min(1).required(),
  content: Joi.string().min(1).required(),
  // Add more properties as needed
}));

// Validation middleware for deleting a comment
const validateCommentDelete = validate(Joi.object({
  // Define the required properties for deleting a comment
  // For example:
  commentId: Joi.number().integer().min(1).required(),
}));

// Validation middleware for getting comments by threadId
const validateCommentGetThreadId = validate(Joi.object({
  // Define the required properties for getting comments by threadId
  // For example:
  threadId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateCommentCreate,
  validateCommentUpdate,
  validateCommentDelete,
  validateCommentGetThreadId,
  // Add more exported validation middleware as needed
};
