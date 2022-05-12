const { ExtraService } = require('../services');
const { httpCodes } = require('../utils');

class KeypointsController {
  static async create(req, res, next) {
    try {
      const { params: { id: characterId }, body: { info } } = req;

      const extra = await ExtraService.create({ characterId, info }, req.method);
      return res.status(httpCodes.CREATED).json(extra);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const extra = await ExtraService.getById(req.params.id);
      return res.status(httpCodes.OK).json(extra);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = KeypointsController;
