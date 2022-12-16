import { StatusCodes } from 'http-status-codes';
import { IStory } from '../../../interfaces/IStory';
import { IStoryRepository } from '../../../repositories/Story/IStoryRepository';
import { IUserRepository } from '../../../repositories/User/IUserRepository';
import { Messages, RequestError } from '../../../utils';

export interface IStoryGetMyStoriesService {
  handle: (authorId: string) => Promise<IStory[]>;
}

class StoryGetMyStoriesService {
  constructor(
    public repository: IStoryRepository,
    public userRepository: IUserRepository,
  ) {
    this.repository = repository;
  }

  public handle = async (authorId: string) => {
    const existingAuthor = await this.userRepository.findById(authorId);

    if (!existingAuthor) {
      throw new RequestError(Messages.AUTHOR_DOES_NOT_EXIST, StatusCodes.NOT_FOUND);
    }

    const stories = await this.repository.findByAuthor(authorId);
    return stories;
  };
}

export default StoryGetMyStoriesService;
