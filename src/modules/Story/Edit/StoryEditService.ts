import { StatusCodes } from 'http-status-codes';
import { IStory, IStoryDTO } from '../../../interfaces/IStory';
import { IStoryRepository } from '../../../repositories/Story/IStoryRepository';
import { Messages, RequestError } from '../../../utils';

export interface IStoryEditService {
  handle(id: string, fields: Partial<IStoryDTO>): Promise<IStory>;
}

class StoryEditService {
  constructor(public repository: IStoryRepository) {
    this.repository = repository;
  }

  public handle = async (id: string, fields: Partial<IStoryDTO>) => {
    const existingStory = await this.repository.findById(id);
    if (!existingStory) {
      throw new RequestError(Messages.STORY_NOT_FOUND, StatusCodes.NOT_FOUND);
    }

    const editedStory = await this.repository.editFields(id, fields);
    return editedStory;
  };
}

export default StoryEditService;
