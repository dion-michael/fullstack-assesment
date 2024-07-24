const errorCodes = {
  NOT_FOUND: 'NOT_FOUND',
  INVALID_REQUEST_BODY: 'INVALID_REQUEST_BODY',
  SERVER_ERROR: 'SERVER_ERROR',
  MONGO_ERROR: 'MONGO_ERROR'
};

const errorStatus = {
  NOT_FOUND: 404,
  INVALID_REQUEST_BODY: 400,
  SERVER_ERROR: 500,
  MONGO_ERROR: 500
};

const errorMessages = {
  NOT_FOUND: 'resource not found',
  INVALID_REQUEST_BODY: 'the request body is invalid. please check again',
  SERVER_ERROR: 'an error occured on the server',
  MONGO_CONNECTION_ERROR: 'there is a problem connecting to mongo'
};

class CustomError extends Error {
  constructor(code, message, status, details) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.code = code || 'SERVER_ERROR';

    this.message = message || 'Something went wrong. Please try again.';

    this.status = status || 500;

    this.details = details;
  }
}

const errorHandler = (err, _req, res, _next) => {
  // console.error(err.stack);
  let message = err.message || errorMessages[err.code] || 'an error occured';
  if (err.message && err.message.includes('Cast to ObjectId failed')) {
    message = `please provide a valid id`;
    err.status = 400;
  }
  if (err.code && errorCodes[err.code]) {
    return res
      .status(errorStatus[err.code])
      .json({ message, details: err.details });
  }
  res.status(err.status || 500).json({
    message,
    code: 'SERVER_ERROR'
  });
};

module.exports = {
  errorStatus,
  errorCodes,
  errorMessages,
  errorHandler,
  CustomError
};
