const router = require('express').Router();
const { celebrate, Segments, Joi } = require('celebrate');
const { CharacterController, KeyPointsController, ExtraController } = require('../controllers');
const auth = require('../middlewares/auth');

router
  .route('/')
  .get(auth, CharacterController.listAll)
  .post(
    auth,
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        storyId: Joi.string().not().empty().required(),
        name: Joi.string().not().empty().required(),
        birthdate: Joi.string().not().empty().optional(),
        father: Joi.string().not().empty().optional(),
        mother: Joi.string().not().empty().optional(),
      }),
    }),
    CharacterController.create);

router
  .route('/:id')
  .get(auth, CharacterController.getById)
  .delete(auth, CharacterController.delete)
  .put(
    auth,
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        storyId: Joi.string().not().empty().optional(),
        name: Joi.string().not().empty().optional(),
        birthdate: Joi.string().not().empty().optional(),
        father: Joi.string().not().empty().optional(),
        mother: Joi.string().not().empty().optional(),
      }),
    }),
    CharacterController.update);

router
  .route('/:id/keypoints')
  .get(auth, KeyPointsController.getById)
  .put(
    auth,
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
    }),
    KeyPointsController.create,
  )
  .post(
    auth,
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
    }),
    KeyPointsController.create,
  );

router
  .route('/:id/extra')
  .get(auth, ExtraController.getById)
  .put(
    auth,
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        info: Joi.string().not().empty().required(),
      }),
    }),
    ExtraController.create)
  .post(
    auth,
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        info: Joi.string().not().empty().required(),
      }),
    }),
    ExtraController.create);

module.exports = router;
