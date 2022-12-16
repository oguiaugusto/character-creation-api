import { StatusCodes } from 'http-status-codes';
import { IStory, IStoryDTO } from '../../../interfaces/IStory';
import { IStoryRepository } from '../../../repositories/Story/IStoryRepository';
import { Messages, RequestError } from '../../../utils';
import StoryUtils from '../utils';

export interface IStoryCreateService {
  handle(story: IStoryDTO): Promise<IStory>;
}

class StoryCreateService implements IStoryCreateService {
  constructor(public repository: IStoryRepository) {
    this.repository = repository;
  }

  public handle = async (story: IStoryDTO) => {
    const authorHasStoryWithSameTitle = await StoryUtils
      .checkSameTitle(this.repository, story.title, story.authorId);

    if (authorHasStoryWithSameTitle) {
      throw new RequestError(Messages.STORY_WITH_SAME_TITLE, StatusCodes.CONFLICT);
    }

    const newStory = await this.repository.create(story);
    return newStory;
  };
}

export default StoryCreateService;
