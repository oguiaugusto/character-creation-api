import { storyRepository } from '../../../repositories/Story';
import StoryCreateController from './StoryCreateController';
import StoryCreateService from './StoryCreateService';

const storyCreateService = new StoryCreateService(storyRepository);
const storyCreateController = new StoryCreateController(storyCreateService);

export { storyCreateService, storyCreateController };
