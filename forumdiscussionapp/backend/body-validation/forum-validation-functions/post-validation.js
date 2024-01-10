import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for creating a forum post
export const validateForumPostCreate = validate(
  Joi.object({
    // Adjust the properties and validation rules according to your needs
    forumId: Joi.number().integer().min(1).required(),
    userId: Joi.number().integer().min(1).required(),
    postContent: Joi.string().required(),
  })
);

// Validation middleware for updating a forum post
export const validateForumPostUpdateById = validate(
  Joi.object({
    // Adjust the properties and validation rules according to your needs
    //userId: Joi.number().integer().min(1).required(),
    forumPostId: Joi.number().integer().min(1).required(),
    postContent: Joi.string().required(),
  })
);

// Validation middleware for deleting a forum post
export const validateForumPostDelete = validate(
  Joi.object({
    // Adjust the properties and validation rules according to your needs
    //userId: Joi.number().integer().min(1).required(),
    forumPostId: Joi.number().integer().min(1).required(),
  })
);

// Validation middleware for getting forum posts for a specific forum
export const validateForumPostGetForumId = validate(
  Joi.object({
    // Adjust the properties and validation rules according to your needs
    forumId: Joi.number().integer().min(1).required(),
  })
);
