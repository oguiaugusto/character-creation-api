const { CharacterService } = require('../services');
const { httpCodes } = require('../utils');

class CharacterController {
  static async create(req, res, next) {
    try {
      const { storyId, name, birthdate, father, mother } = req.body;
      const character = await CharacterService.create({ storyId, name, birthdate, father, mother });

      return res.status(httpCodes.CREATED).json(character);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { body: { storyId, name, birthdate, father, mother }, params: { id } } = req;
      const character = await CharacterService.update({
        id, storyId, name, birthdate, father, mother,
      });

      return res.status(httpCodes.OK).json(character);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      await CharacterService.delete(req.params.id);
      return res.status(httpCodes.NO_CONTENT).end();
    } catch (error) {
      next(error);
    }
  }

  static async listAll(_req, res, next) {
    try {
      const characters = await CharacterService.listAll();
      return res.status(httpCodes.OK).json(characters);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const character = await CharacterService.getById(req.params.id);
      return res.status(httpCodes.OK).json(character);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CharacterController;
