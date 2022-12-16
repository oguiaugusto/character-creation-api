import { Joi } from 'celebrate';

const TITLE_KEY = Joi.string().min(3).max(100);
const DESCRIPTION_KEY = Joi.string().min(3).max(510);
const PICTURE_KEY = Joi.string().uri();

class Schemas {
  public static get createUser() {
    return Joi.object().keys({
      username: Joi.string().min(3).max(20).lowercase().required(),
      password: Joi.string().min(6).required(),
    });
  }

  public static get createStory() {
    return Joi.object().keys({
      title: TITLE_KEY.required(),
      description: DESCRIPTION_KEY.optional(),
      picture: PICTURE_KEY.optional(),
    });
  }

  public static get editStory() {
    return Joi.object().keys({
      title: Joi.string().min(3).max(100).optional(),
      description: DESCRIPTION_KEY.optional(),
      picture: PICTURE_KEY.optional(),
    });
  }
}

export default Schemas;
