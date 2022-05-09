const { isCelebrateError } = require('celebrate');
const { httpCodes } = require('../utils');

module.exports = (err, _req, res, _next) => {
  if (isCelebrateError(err)) {
    const { message } = err.details.entries().next().value[1].details[0];
    return res.status(httpCodes.BAD_REQUEST).json({ message });
  }

  if (!err.code || !err.message) {
    return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }

  const { code, message } = err;
  return res.status(code).json({ message });
};