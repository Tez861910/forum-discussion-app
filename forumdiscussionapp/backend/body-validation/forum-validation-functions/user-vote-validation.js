const Joi = require('joi');
const { validate } = require('../../authvalid');

// Validation middleware for creating a user poll vote
const validateUserPollVoteCreate = validate(Joi.object({
  // Define the schema for creating a user poll vote
  // Adjust the properties and validation rules according to your needs
  userId: Joi.number().integer().min(1).required(),
  pollOptionId: Joi.number().integer().min(1).required(),
}));

// Validation middleware for deleting a user poll vote
const validateUserPollVoteDelete = validate(Joi.object({
  // Define the schema for deleting a user poll vote
  userPollVoteId: Joi.number().integer().min(1).required(),
}));

// Validation middleware for getting user poll votes by userId
const validateUserPollVoteGetByUserId = validate(Joi.object({
  // Define the schema for getting user poll votes by userId
  userId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateUserPollVoteCreate,
  validateUserPollVoteDelete,
  validateUserPollVoteGetByUserId,
};
