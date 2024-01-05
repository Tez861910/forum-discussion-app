import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for creating a forum
export const validateForumCreate = validate(
  Joi.object({
    // Define the schema for creating a forum
    // Adjust the properties and validation rules according to your needs
    title: Joi.string().required(),
    content: Joi.string().required(),
  })
);

// Validation middleware for updating a forum
export const validateForumUpdate = validate(
  Joi.object({
    // Define the schema for updating a forum
    // Adjust the properties and validation rules according to your needs
    title: Joi.string(),
    content: Joi.string(),
  })
);

// Validation middleware for getting a forum by forumId
export const validateForumGetById = validate(
  Joi.object({
    // Define the schema for getting a forum by forumId
    forumId: Joi.number().integer().min(1).required(),
  })
);
