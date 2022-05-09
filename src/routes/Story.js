const router = require('express').Router();
const { StoryController } = require('../controllers');
const { celebrate, Segments, Joi } = require('celebrate');

router
  .route('/')
  .get(StoryController.listAll)
  .post(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().not().empty().required(),
        description: Joi.string().not().empty().required(),
      }),
    }), StoryController.create);

router
  .route('/:id')
  .get(StoryController.getById)
  .delete(StoryController.delete)
  .put(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().not().empty().optional(),
        description: Joi.string().not().empty().optional(),
      }),
    }), StoryController.update);

router
  .route('/:id/characters')
  .get(StoryController.getAllCharacters)

module.exports = router;
