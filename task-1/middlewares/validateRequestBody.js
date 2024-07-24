const {
  CustomError,
  errorCodes,
  errorMessages,
  errorStatus
} = require('../errorHandler');

const validationOptions = {
  abortEarly: false,
  allowUnknown: false,
  stripUnknown: false
};

const validateRequestBody = (schema) => {
  if (!schema) throw new Error('validate request body should have a schema');
  return (req, _res, next) => {
    const { error, value } = schema.validate(req.body, validationOptions);
    if (error) {
      const err = new CustomError(
        errorCodes.INVALID_REQUEST_BODY,
        errorMessages.INVALID_REQUEST_BODY,
        errorStatus.INVALID_REQUEST_BODY,
        error.details.map(({ message, context }) => ({
          message,
          context
        }))
      );
      return next(err);
    }
    req.body = value;
    return next();
  };
};

module.exports = validateRequestBody;
