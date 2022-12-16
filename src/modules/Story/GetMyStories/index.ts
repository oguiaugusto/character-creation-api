import { storyRepository } from '../../../repositories/Story';
import { userRepository } from '../../../repositories/User';
import StoryGetMyStoriesController from './StoryGetMyStoriesController';
import StoryGetMyStoriesService from './StoryGetMyStoriesService';

const storyGetMyStoriesService = new StoryGetMyStoriesService(
  storyRepository,
  userRepository,
);
const storyGetMyStoriesController = new StoryGetMyStoriesController(storyGetMyStoriesService);

export { storyGetMyStoriesService, storyGetMyStoriesController };
