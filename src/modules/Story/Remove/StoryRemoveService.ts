import { StatusCodes } from 'http-status-codes';
import { IStoryRepository } from '../../../repositories/Story/IStoryRepository';
import { Messages, RequestError } from '../../../utils';

export interface IStoryRemoveService {
  handle(id: string, authorId: string): Promise<void>;
}

class StoryRemoveService {
  constructor(public repository: IStoryRepository) {
    this.repository = repository;
  }

  public handle = async (id: string, authorId: string) => {
    const existingStory = await this.repository.findById(id);
    if (!existingStory) {
      throw new RequestError(Messages.STORY_NOT_FOUND, StatusCodes.NOT_FOUND);
    }

    if (existingStory.authorId !== authorId) {
      throw new RequestError(Messages.YOU_DONT_HAVE_PERMISSION, StatusCodes.FORBIDDEN);
    }

    await this.repository.remove(id);
  };
}

export default StoryRemoveService;
