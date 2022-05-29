import { Joi } from 'celebrate';

const Schemas = {
  UserPost: Joi.object().keys({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
    picture: Joi.string().optional(),
  }),
};

export {
  Schemas,
};
