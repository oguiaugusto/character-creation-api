/* eslint-disable no-loop-func */
const { Story, Character } = require('../database/models');
const { RequestError, httpCodes, helpers } = require('../utils');

const messages = {
  storyNotFound: 'Story not found',
  storyAlreadyExists: 'Story already exists',
};

class StoryService {
  static async create({ name, description, picture }) {
    const existingStory = await Story.findOne({ where: { name } });
    if (existingStory) throw new RequestError(messages.storyAlreadyExists, httpCodes.CONFLICT);

    const allStories = await Story.findAll();

    let storyId = helpers.getRandomId('STO');
    while (allStories.some(({ id }) => id === storyId)) {
      storyId = helpers.getRandomId('STO');
    }

    const story = await Story.create({ id: storyId, name, description, picture: picture || null });
    return story;
  }

  static async update({ id, name, description, picture }) {
    const existingStory = await Story.findByPk(id);
    if (!existingStory) throw new RequestError(messages.storyNotFound, httpCodes.NOT_FOUND);

    const validKeys = helpers.getValidKeys({ name, description, picture });
    if (Object.keys(validKeys).length !== 0) {
      const story = await existingStory.update(validKeys);
      return story;
    }
    return existingStory;
  }

  static async updatePicture({ id, picture }) {
    const existingStory = await Story.findByPk(id);
    if (!existingStory) throw new RequestError(messages.storyNotFound, httpCodes.NOT_FOUND);

    const story = existingStory.update({ picture });
    return story;
  }

  static async delete(id) {
    const existingStory = await Story.findByPk(id);
    if (!existingStory) throw new RequestError(messages.storyNotFound, httpCodes.NOT_FOUND);

    await existingStory.destroy();
  }

  static async listAll() {
    const stories = await Story.findAll();
    return stories;
  }

  static async getById(id) {
    const story = await Story.findByPk(id);

    if (!story) throw new RequestError(messages.storyNotFound, httpCodes.NOT_FOUND);
    return story;
  }

  static async getAllCharacters(id) {
    const story = await Story.findOne({
      where: { id },
      include: { model: Character, as: 'characters' },
    });

    if (!story) throw new RequestError(messages.storyNotFound, httpCodes.NOT_FOUND);
    return story;
  }
}

module.exports = StoryService;
