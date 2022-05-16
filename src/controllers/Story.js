const { StoryService } = require('../services');
const { httpCodes } = require('../utils');

class StoryController {
  static async create(req, res, next) {
    try {
      const { name, description, picture } = req.body;
      const story = await StoryService.create({ name, description, picture });

      return res.status(httpCodes.CREATED).json(story);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { body: { name, description, picture }, params: { id } } = req;
      const story = await StoryService.update({ id, name, description, picture });

      return res.status(httpCodes.OK).json(story);
    } catch (error) {
      next(error);
    }
  }

  static async updatePicture(req, res, next) {
    try {
      const { body: { picture }, params: { id } } = req;
      const story = await StoryService.updatePicture({ id, picture });

      return res.status(httpCodes.OK).json(story);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      await StoryService.delete(req.params.id);
      return res.status(httpCodes.NO_CONTENT).end();
    } catch (error) {
      next(error);
    }
  }

  static async listAll(_req, res, next) {
    try {
      const stories = await StoryService.listAll();
      return res.status(httpCodes.OK).json(stories);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const story = await StoryService.getById(req.params.id);
      return res.status(httpCodes.OK).json(story);
    } catch (error) {
      next(error);
    }
  }

  static async getAllCharacters(req, res, next) {
    try {
      const story = await StoryService.getAllCharacters(req.params.id);
      return res.status(httpCodes.OK).json(story);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = StoryController;
