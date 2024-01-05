import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for avatar upload
export const validateAvatarUpload = validate(
  Joi.object({
    userId: Joi.number().integer().min(1).required(),
  })
);

// Validation middleware for token refresh
export const validateTokenRefresh = validate(
  Joi.object({
    userId: Joi.number().integer().min(1).required(),
    email: Joi.string().email().required(),
    roleId: Joi.number().integer().min(1).required(),
  })
);
