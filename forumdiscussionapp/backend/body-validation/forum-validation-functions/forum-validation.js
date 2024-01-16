import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for creating a forum
export const validateForumCreate = validate(
  Joi.object({
    // Adjust the properties and validation rules according to your needs
    courseId: Joi.number().integer().min(1).required(),
    forumName: Joi.string().required(),
    forumDescription: Joi.string().required(),
    createdByUserId: Joi.number().integer().min(1).required(),
  })
);

// Validation middleware for updating a forum
export const validateForumUpdate = validate(
  Joi.object({
    // Adjust the properties and validation rules according to your needs
    forumId: Joi.number().integer().min(1).required(),
    forumName: Joi.string(),
    forumDescription: Joi.string(),
    userId: Joi.number().integer().min(1).required(),
  })
);

// Validation middleware for getting forums by courseId
export const validateForumGetCourseId = validate(
  Joi.object({
    // For example:
    courseId: Joi.number().integer().min(1).required(),
  })
);

// Validation middleware for getting a forum by forumId
export const validateForumGetById = validate(
  Joi.object({
    // Define the schema for getting a forum by forumId
    forumId: Joi.number().integer().min(1).required(),
  })
);
