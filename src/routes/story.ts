import rescue from 'express-rescue';
import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import { storyCreateController } from '../modules/Story/Create';
import { storyGetMyStoriesController } from '../modules/Story/GetMyStories';
import Schemas from '../utils/JoiSchemas';

const storyRouter = Router();

storyRouter
  .route('/')
  .post(
    celebrate({ [Segments.BODY]: Schemas.createStory }),
    rescue(storyCreateController.handle),
  );

storyRouter
  .route('/my-stories')
  .get(
    rescue(storyGetMyStoriesController.handle),
  );

export default storyRouter;
