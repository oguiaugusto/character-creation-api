import { Joi } from 'celebrate';

class Schemas {
  public static get createUser() {
    return Joi.object().keys({
      username: Joi.string().min(3).max(20).required(),
      password: Joi.string().min(6).required(),
    });
  }
}

export default Schemas;
