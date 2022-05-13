const router = require('express').Router();
const { celebrate, Segments, Joi } = require('celebrate');
const { UserController, login } = require('../controllers');
const auth = require('../middlewares/auth');

router
  .route('/')
  .post(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().not().empty().required(),
        password: Joi.string().not().empty().required(),
      }),
    }), UserController.create);

router
  .route('/login')
  .post(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().not().empty().required(),
        password: Joi.string().not().empty().required(),
      }),
    }), login);

router
  .route('/:id')
  .get(auth, UserController.getById);

module.exports = router;
