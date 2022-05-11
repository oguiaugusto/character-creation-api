const router = require('express').Router();
const { CharacterController } = require('../controllers');
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

module.exports = router;
