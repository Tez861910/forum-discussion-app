import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for creating a new friend request
export const validateRequestCreate = validate(
  Joi.object({
    // Define the schema for creating a new friend request
    // Add properties such as senderId, receiverId, status, etc. based on your requirements
    senderId: Joi.number().integer().min(1).required(),
    receiverId: Joi.number().integer().min(1).required(),
    status: Joi.string().valid("pending", "accepted", "rejected").required(),
    // Add more properties as needed
  })
);

// Validation middleware for updating friend request status by request ID
export const validateRequestUpdate = validate(
  Joi.object({
    // Define the schema for updating friend request status by request ID
    requestId: Joi.number().integer().min(1).required(),
    status: Joi.string().valid("accepted", "rejected").required(),
    // Add more properties as needed
  })
);

// Validation middleware for getting friend request by request ID
export const validateRequestGet = validate(
  Joi.object({
    // Define the schema for getting friend request by request ID
    requestId: Joi.number().integer().min(1).required(),
  })
);
