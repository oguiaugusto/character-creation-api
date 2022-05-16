const router = require('express').Router();
const { celebrate, Segments, Joi } = require('celebrate');
const { StoryController } = require('../controllers');
const auth = require('../middlewares/auth');

router
  .route('/')
  .get(auth, StoryController.listAll)
  .post(
    auth,
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().not().empty().required(),
        description: Joi.string().not().empty().required(),
        picture: Joi.string().not().empty().optional(),
      }),
    }),
    StoryController.create);

router
  .route('/:id')
  .get(auth, StoryController.getById)
  .delete(auth, StoryController.delete)
  .put(
    auth,
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().not().empty().optional(),
        description: Joi.string().not().empty().optional(),
        picture: Joi.string().not().empty().optional(),
      }),
    }),
    StoryController.update);

router
  .route('/:id/characters')
  .get(auth, StoryController.getAllCharacters);

router
  .route('/:id/picture')
  .put(
    auth,
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        picture: Joi.string().not().empty().required(),
      }),
    }),
    StoryController.updatePicture);

module.exports = router;
