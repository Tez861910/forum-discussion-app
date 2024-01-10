import Joi from "joi";
import { StatusCodes } from "http-status-codes";

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.name = "ValidationError";
  }
}

export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate({
      ...req.body,
      ...req.params,
      ...req.query,
    });

    if (error) {
      console.error(
        `Validation error on ${req.method} ${req.path}: ${error.details[0].message}`
      );
      return next(new ValidationError(error.details[0].message));
    }

    next();
  };
};
