/* eslint-disable no-loop-func */
const { User } = require('../database/models');
const { RequestError, httpCodes, helpers } = require('../utils');

const messages = {
  userNotFound: 'User not found',
  userAlreadyRegistered: 'User already registered',
  credentialsError: 'User does not exist or invalid password',
};

class UserService {
  static async create({ email, password }) {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) throw new RequestError(messages.userAlreadyRegistered, httpCodes.CONFLICT);

    const allUsers = await User.findAll();

    let userId = helpers.getRandomId('USR');
    while (allUsers.some(({ id }) => id === userId)) {
      userId = helpers.getRandomId('USR');
    }

    const user = await User.create({ id: userId, email, password });
    delete user.dataValues.password;

    return user;
  }

  static async update({ id, email, password }) {
    const existingUser = await User.findByPk(id);
    if (!existingUser) throw new RequestError(messages.userNotFound, httpCodes.NOT_FOUND);

    const validKeys = helpers.getValidKeys({ email, password });
    if (Object.keys(validKeys).length !== 0) {
      const user = await existingUser.update(validKeys);
      return user;
    }
    return existingUser;
  }

  static async getById(id) {
    const user = await User.findByPk(id);

    if (!user) throw new RequestError(messages.userNotFound, httpCodes.NOT_FOUND);
    delete user.dataValues.password;

    return user;
  }

  static async getByCredentials({ email, password }) {
    const user = await User.findOne({ where: { email, password } });

    if (!user) throw new RequestError(messages.credentialsError, httpCodes.UNAUTHORIZED);
    // it doest not throw error because its only used in the login controller
    return user;
  }
}

module.exports = UserService;
