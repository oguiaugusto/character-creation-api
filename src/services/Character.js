const { Character, Story, KeyPoints } = require('../database/models');
const { RequestError, httpCodes, helpers } = require('../utils');

const messages = {
  characterNotFound: 'Character not found',
  characterAlreadyExists: 'Character already exists',
  storyNotFound: 'Story not found',
};

class CharacterService {
  static async create({ storyId, name, birthdate, father, mother }) {
    const existingCharacter = await Character.findOne({ where: { storyId, name } });
    if (existingCharacter) throw new RequestError(
      messages.characterAlreadyExists, httpCodes.CONFLICT,
    );

    const allCharacters = await Character.findAll();

    let characterId = helpers.getRandomId('CHA');
    while (allCharacters.some(({ id }) => id === characterId)) {
      characterId = helpers.getRandomId('CHA');
    };

    const validKeys = helpers.getValidKeys({ birthdate, father, mother });
    const character = await Character.create({ id: characterId, storyId, name, ...validKeys });

    return character;
  }

  static async update({ id, storyId, name, birthdate, father, mother }) {
    const existingCharacter = await Character.findByPk(id);
    if (!existingCharacter) throw new RequestError(messages.characterNotFound, httpCodes.NOT_FOUND);
    console.log(father);

    const existingStory = await Story.findByPk(storyId || existingCharacter.dataValues.storyId);
    if (!existingStory) throw new RequestError(messages.storyNotFound, httpCodes.NOT_FOUND);

    const validKeys = helpers.getValidKeys({ storyId, name, birthdate, father, mother });
    console.log(validKeys);
    if (Object.keys(validKeys).length !== 0) {
      const character = await existingCharacter.update({ ...validKeys });
      return character;
    }
    return existingCharacter;
  }

  static async delete(id) {
    const existingCharacter = await Character.findByPk(id);
    if (!existingCharacter) throw new RequestError(messages.characterNotFound, httpCodes.NOT_FOUND);

    await existingCharacter.destroy();
  }

  static async listAll() {
    const characters = await Character.findAll();
    return characters;
  }

  static async getById(id) {
    const character = await Character.findByPk(id, { include: { model: KeyPoints, as: 'keyPoints' } });

    if (!character) throw new RequestError(messages.characterNotFound, httpCodes.NOT_FOUND);
    return character;
  }
};

module.exports = CharacterService;
