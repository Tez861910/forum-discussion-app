class CustomError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = validateStatusCode(statusCode);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

function validateStatusCode(statusCode) {
  const validStatusCodes = [400, 401, 403, 404, 500];
  return validStatusCodes.includes(statusCode) ? statusCode : 500;
}

function handleError(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (!(err instanceof CustomError)) {
    console.error(err.stack);
  }

  const statusCode = err instanceof CustomError ? err.statusCode : 500;
  const message =
    err instanceof CustomError ? err.message : "Internal Server Error";

  res.status(statusCode).json({ error: message });
}

export { handleError, CustomError };
