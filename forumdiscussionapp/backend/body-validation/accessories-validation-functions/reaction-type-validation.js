import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for creating a reaction type
export const validateReactionTypeCreate = validate(
  Joi.object({
    // Define the schema for creating a reaction type
    // Adjust the properties and validation rules according to your needs
    reactionName: Joi.string().required(),
    // Add more properties as needed
  })
);

// Validation middleware for updating a reaction type
export const validateReactionTypeUpdate = validate(
  Joi.object({
    // Define the schema for updating a reaction type
    reactionTypeId: Joi.number().integer().min(1).required(),
    reactionName: Joi.string(),
    // Add more properties as needed
  }).min(1)
); // At least one property is required for an update

// Validation middleware for deleting a reaction type
export const validateReactionTypeDelete = validate(
  Joi.object({
    // Define the schema for deleting a reaction type
    reactionTypeId: Joi.number().integer().min(1).required(),
  })
);

// Validation middleware for getting all reaction types
export const validateReactionTypeGetAll = validate(Joi.object({}));
