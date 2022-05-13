const { Extra, Character } = require('../database/models');
const { RequestError, httpCodes } = require('../utils');

const messages = {
  characterNotFound: 'Character not found',
  extraAlreadyRegistered: 'Extra informations already registered',
  extraNotFound: 'Extra informations not found',
};

class ExtraService {
  static async create({ characterId, info }, method) {
    const existingCharacter = await Character.findByPk(characterId);
    if (!existingCharacter) throw new RequestError(
      messages.characterNotFound, httpCodes.NOT_FOUND,
    );

    const existingExtra = await Extra.findByPk(characterId);
    if (method === 'PUT' && !existingExtra) throw new RequestError(
      messages.extraNotFound, httpCodes.NOT_FOUND,
    );
    if (method === 'POST' && existingExtra) throw new RequestError(
      messages.extraAlreadyRegistered, httpCodes.CONFLICT,
    );

    const extra = await (method === 'POST'
      ? Extra.create({ characterId, info })
      : existingExtra.update({ info }));

    return extra;
  }

  static async getById(characterId) {
    const extra = await Extra.findByPk(characterId);

    if (!extra) throw new RequestError(messages.extraNotFound, httpCodes.NOT_FOUND);
    return extra;
  }
}

module.exports = ExtraService;
