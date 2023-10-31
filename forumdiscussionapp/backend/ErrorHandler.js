function handleError(err, req, res, next) {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  res.status(statusCode).json({ error: message });
}

class CustomError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = {
  handleError,
  CustomError,
};
