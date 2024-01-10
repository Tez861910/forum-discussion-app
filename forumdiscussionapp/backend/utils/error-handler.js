import { StatusCodes } from "http-status-codes";

export class CustomError extends Error {
  constructor(message, statusCode = StatusCodes.INTERNAL_SERVER_ERROR) {
    super(message);
    this.statusCode = validateStatusCode(statusCode);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class AuthenticationError extends CustomError {
  constructor(message) {
    super(message, StatusCodes.UNAUTHORIZED);
    this.name = "AuthenticationError";
  }
}

export class NotFoundError extends CustomError {
  constructor(message) {
    super(message, StatusCodes.NOT_FOUND);
    this.name = "NotFoundError";
  }
}

export class ForbiddenError extends CustomError {
  constructor(message) {
    super(message, StatusCodes.FORBIDDEN);
    this.name = "ForbiddenError";
  }
}

function validateStatusCode(statusCode) {
  const validStatusCodes = Object.values(StatusCodes);
  return validStatusCodes.includes(statusCode)
    ? statusCode
    : StatusCodes.INTERNAL_SERVER_ERROR;
}

export function handleError(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({ error: message });
}
