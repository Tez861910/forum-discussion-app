const Joi = require('joi');
const { validate } = require('../authvalid');

// Validation middleware for creating a friendship
const validateFriendsCreate = validate(Joi.object({
  // Define the schema for creating a friendship
  // Add properties such as userId, friendId, status, etc. based on your requirements
  userId: Joi.number().integer().min(1).required(),
  friendId: Joi.number().integer().min(1).required(),
  status: Joi.string().valid('pending', 'accepted', 'rejected').required(),
  // Add more properties as needed
}));

// Validation middleware for getting user's friends by user ID
const validateFriendsGet = validate(Joi.object({
  // Define the schema for getting user's friends by user ID
  userId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateFriendsCreate,
  validateFriendsGet,
};
