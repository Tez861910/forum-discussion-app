import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for getting role enrollments
export const validateRoleId = validate(
  Joi.object({
    // Define the schema for getting role enrollments
    roleId: Joi.number().integer().min(1).required(),
  })
);

// Validation middleware for enrolling a user in a role
export const validateRoleIdUserIdEnroll = validate(
  Joi.object({
    // Define the schema for enrolling a user in a role
    roleId: Joi.number().integer().min(1).required(),
    userId: Joi.number().integer().min(1).required(),
  })
);

// Validation middleware for removing a user from a role by ID
export const validateRoleIdUserIdRemoveById = validate(
  Joi.object({
    // Define the schema for removing a user from a role by ID
    roleId: Joi.number().integer().min(1).required(),
    userId: Joi.number().integer().min(1).required(),
  })
);

// Validation middleware for removing users from a role
export const validateRoleIdUserIdsRemove = validate(
  Joi.object({
    // Define the schema for removing users from a role
    roleId: Joi.number().integer().min(1).required(),
    userIds: Joi.array().items(Joi.number().integer().min(1)).required(),
  })
);
