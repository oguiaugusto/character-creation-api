const { User } = require('../database/models');
const { RequestError, httpCodes, jwtUser } = require('../utils');

const messages = {
  tokenNotFound: 'Token not found',
  noUser: 'Error finding token user',
};

module.exports = async (req, _res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw new RequestError(messages.tokenNotFound, httpCodes.UNAUTHORIZED);

    const decoded = jwtUser.verify(token);

    const user = await User.findOne({ where: { email: decoded.email } });

    if (!user) throw new RequestError(messages.noUser);
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
