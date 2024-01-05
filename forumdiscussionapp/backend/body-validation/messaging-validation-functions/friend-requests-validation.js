const Joi = require('joi');
const { validate } = require('../../authvalid');

// Validation middleware for creating a new friend request
const validateRequestCreate = validate(Joi.object({
  // Define the schema for creating a new friend request
  // Add properties such as senderId, receiverId, status, etc. based on your requirements
  senderId: Joi.number().integer().min(1).required(),
  receiverId: Joi.number().integer().min(1).required(),
  status: Joi.string().valid('pending', 'accepted', 'rejected').required(),
  // Add more properties as needed
}));

// Validation middleware for updating friend request status by request ID
const validateRequestUpdate = validate(Joi.object({
  // Define the schema for updating friend request status by request ID
  requestId: Joi.number().integer().min(1).required(),
  status: Joi.string().valid('accepted', 'rejected').required(),
  // Add more properties as needed
}));

// Validation middleware for getting friend request by request ID
const validateRequestGet = validate(Joi.object({
  // Define the schema for getting friend request by request ID
  requestId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateRequestCreate,
  validateRequestUpdate,
  validateRequestGet,
};
