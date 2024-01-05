import Joi from "joi";
import { validate } from "../../authvalid.js";

// Validation middleware for creating an attachment type
export const validateAttachmentTypeCreate = validate(
  Joi.object({
    // Define the schema for creating an attachment type
    // Adjust the properties and validation rules according to your needs
    typeName: Joi.string().required(),
    // Add more properties as needed
  })
);

// Validation middleware for updating an attachment type
export const validateAttachmentTypeUpdate = validate(
  Joi.object({
    // Define the schema for updating an attachment type
    attachmentTypeId: Joi.number().integer().min(1).required(),
    typeName: Joi.string(),
    // Add more properties as needed
  }).min(1)
); // At least one property is required for an update

// Validation middleware for deleting an attachment type
export const validateAttachmentTypeDelete = validate(
  Joi.object({
    // Define the schema for deleting an attachment type
    attachmentTypeId: Joi.number().integer().min(1).required(),
  })
);
