import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for creating a forum reply
export const validateForumReplyCreate = validate(
  Joi.object({
    // Define the schema for creating a forum reply
    // Adjust the properties and validation rules according to your needs
    content: Joi.string().required(),
  })
);

// Validation middleware for updating a forum reply
export const validateForumReplyUpdate = validate(
  Joi.object({
    // Define the schema for updating a forum reply
    // Adjust the properties and validation rules according to your needs
    content: Joi.string().required(),
  })
);

// Validation middleware for deleting a forum reply
export const validateForumReplyDelete = validate(
  Joi.object({
    // Define the schema for deleting a forum reply
    forumReplyId: Joi.number().integer().min(1).required(),
  })
);

// Validation middleware for getting forum replies for a specific forum post
export const validateForumReplyGetForumPostId = validate(
  Joi.object({
    // Define the schema for getting forum replies for a specific forum post
    forumPostId: Joi.number().integer().min(1).required(),
  })
);
