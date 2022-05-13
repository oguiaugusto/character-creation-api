const { UserService } = require('../services');
const { RequestError, httpCodes, jwtUser } = require('../utils');

module.exports = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserService.getByCredentials({ email, password });
    if (!user) throw new RequestError(
      'User does not exist or invalid password', httpCodes.UNAUTHORIZED,
    );

    const token = jwtUser.sign(user);
    return res.status(httpCodes.OK).json({ token });
  } catch (error) {
    next(error);
  }
};
