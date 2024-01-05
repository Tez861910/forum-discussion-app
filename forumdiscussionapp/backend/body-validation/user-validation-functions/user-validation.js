import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for user creation
export const validateUserCreate = validate(
  Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    // Add more properties as needed
  })
);

// Validation middleware for updating a user
export const validateUserUpdate = validate(
  Joi.object({
    id: Joi.number().integer().min(1).required(),
    email: Joi.string().email().required(),
    // Add more properties as needed
  })
);

// Validation middleware for updating user profile
export const validateUserUpdateUsers = validate(
  Joi.object({
    id: Joi.number().integer().min(1).required(),
    newField: Joi.string().min(1).required(),
    // Add more properties as needed
  })
);

// Validation middleware for getting a user by ID
export const validateUserGetId = validate(
  Joi.object({
    id: Joi.number().integer().min(1).required(),
  })
);

// Validation middleware for getting users by RoleID
export const validateUserGetRoleId = validate(
  Joi.object({
    roleId: Joi.number().integer().min(1).required(),
  })
);
