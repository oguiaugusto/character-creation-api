const { KeyPoints, Character } = require('../database/models');
const { RequestError, httpCodes, helpers } = require('../utils');

const messages = {
  characterNotFound: 'Character not found',
  keyPointsAlreadyRegistered: 'Key points already registered',
  keyPointsNotFound: 'Key points not found',
};

class KeyPointsService {
  static async create({
    characterId, goal, motivation, purpose, fears, virtues, flaws, peculiarities, love,
  }, method) {
    const existingCharacter = await Character.findByPk(characterId);
    if (!existingCharacter) throw new RequestError(
      messages.characterNotFound, httpCodes.NOT_FOUND,
    );

    const validKeys = helpers.getValidKeys({ goal, motivation, purpose, fears, virtues, flaws, peculiarities, love });

    const existingKeyPoints = await KeyPoints.findByPk(characterId);
    if (method === 'PUT' && !existingKeyPoints) throw new RequestError(
      messages.keyPointsNotFound, httpCodes.NOT_FOUND
    );
    if (method === 'POST' && existingKeyPoints) throw new RequestError(
      messages.keyPointsAlreadyRegistered, httpCodes.CONFLICT
    );

    const keyPoints = await (method === 'POST'
     ? KeyPoints.create({ characterId, ...validKeys })
     : existingKeyPoints.update({ ...validKeys }));

    return keyPoints;
  }

  static async getById(characterId) {
    const keyPoints = await KeyPoints.findByPk(characterId);

    if (!keyPoints) throw new RequestError(messages.keyPointsNotFound, httpCodes.NOT_FOUND);
    return keyPoints;
  }
};

module.exports = KeyPointsService;
