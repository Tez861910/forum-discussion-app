const Joi = require('joi');
const { validate } = require('../authvalid');

// Validation middleware for creating a new exam schedule
const validateScheduleCreate = validate(Joi.object({
  // Define the schema for creating a new exam schedule
  examDate: Joi.date().iso().required(),
  // Add more properties as needed
}));

// Validation middleware for updating an exam schedule by ID
const validateScheduleUpdate = validate(Joi.object({
  // Define the schema for updating an exam schedule by ID
  scheduleId: Joi.number().integer().min(1).required(),
  examDate: Joi.date().iso().required(),
  // Add more properties as needed
}));

// Validation middleware for deleting an exam schedule by ID
const validateScheduleDelete = validate(Joi.object({
  // Define the schema for deleting an exam schedule by ID
  scheduleId: Joi.number().integer().min(1).required(),
}));

module.exports = {
  validateScheduleCreate,
  validateScheduleUpdate,
  validateScheduleDelete,
};
