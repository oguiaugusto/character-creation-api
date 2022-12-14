import rescue from 'express-rescue';
import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import { storyCreateController } from '../modules/Story/Create';
import Schemas from '../utils/JoiSchemas';

const storyRouter = Router();

storyRouter
  .route('/')
  .post(
    celebrate({ [Segments.BODY]: Schemas.createStory }),
    rescue(storyCreateController.handle),
  );

export default storyRouter;
