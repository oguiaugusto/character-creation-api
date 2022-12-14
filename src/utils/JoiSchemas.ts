import { Joi } from 'celebrate';

class Schemas {
  public static get createUser() {
    return Joi.object().keys({
      username: Joi.string().min(3).max(20).lowercase().required(),
      password: Joi.string().min(6).required(),
    });
  }

  public static get createStory() {
    return Joi.object().keys({
      title: Joi.string().min(3).max(100).required(),
      description: Joi.string().min(3).max(510).optional(),
      picture: Joi.string().min(3).max(2048).optional(),
    });
  }
}

export default Schemas;
