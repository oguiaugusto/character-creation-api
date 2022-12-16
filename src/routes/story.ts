import rescue from 'express-rescue';
import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import { storyCreateController } from '../modules/Story/Create';
import { storyGetMyStoriesController } from '../modules/Story/GetMyStories';
import { storyEditController } from '../modules/Story/Edit';
import { storyRemoveController } from '../modules/Story/Remove';
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

storyRouter
  .route('/:id')
  .patch(
    celebrate({ [Segments.BODY]: Schemas.editStory }),
    rescue(storyEditController.handle),
  )
  .delete(
    rescue(storyRemoveController.handle),
  );

export default storyRouter;
