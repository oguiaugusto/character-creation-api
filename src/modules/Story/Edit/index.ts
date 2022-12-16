import { storyRepository } from '../../../repositories/Story';
import StoryEditController from './StoryEditController';
import StoryEditService from './StoryEditService';

const storyEditService = new StoryEditService(storyRepository);
const storyEditController = new StoryEditController(storyEditService);

export { storyEditService, storyEditController };
