import { storyRepository } from '../../../repositories/Story';
import StoryRemoveController from './StoryRemoveController';
import StoryRemoveService from './StoryRemoveService';

const storyRemoveService = new StoryRemoveService(storyRepository);
const storyRemoveController = new StoryRemoveController(storyRemoveService);

export { storyRemoveService, storyRemoveController };
