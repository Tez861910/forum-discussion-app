import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for login
export const validateLogin = validate(
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  })
);
