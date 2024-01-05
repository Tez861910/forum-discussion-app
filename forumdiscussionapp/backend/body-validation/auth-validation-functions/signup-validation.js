import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for signup
export const validateSignup = validate(
  Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    address: Joi.string().max(255),
    phoneNumber: Joi.string().max(20),
    dateOfBirth: Joi.date(),
    genderID: Joi.number().integer().min(1).required(),
  })
);
