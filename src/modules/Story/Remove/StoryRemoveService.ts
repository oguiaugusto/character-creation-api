import { StatusCodes } from 'http-status-codes';
import { IStoryRepository } from '../../../repositories/Story/IStoryRepository';
import { Messages, RequestError } from '../../../utils';

export interface IStoryRemoveService {
  handle(id: string): Promise<void>;
}

class StoryRemoveService {
  constructor(private repository: IStoryRepository) {
    this.repository = repository;
  }

  public handle = async (id: string) => {
    const existingStory = await this.repository.findById(id);
    if (!existingStory) {
      throw new RequestError(Messages.STORY_NOT_FOUND, StatusCodes.NOT_FOUND);
    }

    await this.repository.remove(id);
  };
}

export default StoryRemoveService;
