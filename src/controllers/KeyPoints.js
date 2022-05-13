const { KeyPointsService } = require('../services');
const { httpCodes } = require('../utils');

class KeypointsController {
  static async create(req, res, next) {
    try {
      const {
        params: { id: characterId },
        body: { goal, motivation, purpose, fears, virtues, flaws, peculiarities, love },
      } = req;

      const keyPoints = await KeyPointsService.create({
        characterId, goal, motivation, purpose, fears, virtues, flaws, peculiarities, love,
      }, req.method);

      return res.status(httpCodes.CREATED).json(keyPoints);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const keyPoints = await KeyPointsService.getById(req.params.id);
      return res.status(httpCodes.OK).json(keyPoints);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = KeypointsController;
