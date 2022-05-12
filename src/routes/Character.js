const router = require('express').Router();
const { CharacterController, KeyPointsController, ExtraController } = require('../controllers');
const { celebrate, Segments, Joi } = require('celebrate');

router
  .route('/')
  .get(CharacterController.listAll)
  .post(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        storyId: Joi.string().not().empty().required(),
        name: Joi.string().not().empty().required(),
        birthdate: Joi.string().not().empty().optional(),
        father: Joi.string().not().empty().optional(),
        mother: Joi.string().not().empty().optional(),
      }),
    }), CharacterController.create);

router
  .route('/:id')
  .get(CharacterController.getById)
  .delete(CharacterController.delete)
  .put(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        storyId: Joi.string().not().empty().optional(),
        name: Joi.string().not().empty().optional(),
        birthdate: Joi.string().not().empty().optional(),
        father: Joi.string().not().empty().optional(),
        mother: Joi.string().not().empty().optional(),
      }),
    }), CharacterController.update);

router
  .route('/:id/keypoints')
  .get(KeyPointsController.getById)
  .put(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        goal: Joi.string().not().empty().optional(),
        motivation: Joi.string().not().empty().optional(),
        purpose: Joi.string().not().empty().optional(),
        fears: Joi.string().not().empty().optional(),
        virtues: Joi.string().not().empty().optional(),
        flaws: Joi.string().not().empty().optional(),
        peculiarities: Joi.string().not().empty().optional(),
        love: Joi.string().not().empty().optional(),
      }),
    }), KeyPointsController.create
  )
  .post(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        goal: Joi.string().not().empty().optional(),
        motivation: Joi.string().not().empty().optional(),
        purpose: Joi.string().not().empty().optional(),
        fears: Joi.string().not().empty().optional(),
        virtues: Joi.string().not().empty().optional(),
        flaws: Joi.string().not().empty().optional(),
        peculiarities: Joi.string().not().empty().optional(),
        love: Joi.string().not().empty().optional(),
      }),
    }), KeyPointsController.create
  );

router
  .route('/:id/extra')
  .get(ExtraController.getById)
  .put(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        info: Joi.string().not().empty().required(),
      }),
    }), ExtraController.create)
  .post(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        info: Joi.string().not().empty().required(),
      }),
    }), ExtraController.create);;

module.exports = router;
