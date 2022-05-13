require('dotenv/config');
const { UserService } = require('../services');
const { httpCodes, jwtUser } = require('../utils');
const { RequestError } = require('../utils');

const { CREATION_PASSWORD } = process.env;

const messages = {
  unauthorized: 'Unauthorized access',
};

class UserController {
  static async create(req, res, next) {
    try {
      const { body: { email, password }, headers: { authorization } } = req;

      console.log(authorization);
      console.log(CREATION_PASSWORD);
      if (authorization !== CREATION_PASSWORD) throw new RequestError(
        messages.unauthorized, httpCodes.UNAUTHORIZED,
      );

      const user = await UserService.create({ email, password });
      const token = jwtUser.sign(user);

      return res.status(httpCodes.CREATED).json({ token });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await UserService.update({ email, password });
      const token = jwtUser.sign(user);

      return res.status(httpCodes.OK).json({ token });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const user = await UserService.getById(req.params.id);

      if (!req.user.admin && req.params.id !== req.user.id) throw new RequestError(
        messages.unauthorized, httpCodes.UNAUTHORIZED,
      );
      return res.status(httpCodes.OK).json(user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
