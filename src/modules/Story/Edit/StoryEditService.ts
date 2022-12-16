import { StatusCodes } from 'http-status-codes';
import { IStory, IStoryDTO } from '../../../interfaces/IStory';
import { IStoryRepository } from '../../../repositories/Story/IStoryRepository';
import { Messages, RequestError } from '../../../utils';
import StoryUtils from '../utils';

export interface IStoryEditService {
  handle(id: string, authorId: string, fields: Partial<IStoryDTO>): Promise<IStory>;
}

class StoryEditService {
  constructor(public repository: IStoryRepository) {
    this.repository = repository;
  }

  public handle = async (id: string, authorId: string, fields: Partial<IStoryDTO>) => {
    const existingStory = await this.repository.findById(id);
    if (!existingStory) {
      throw new RequestError(Messages.STORY_NOT_FOUND, StatusCodes.NOT_FOUND);
    }

    if (existingStory.authorId !== authorId) {
      throw new RequestError(Messages.YOU_DONT_HAVE_PERMISSION, StatusCodes.FORBIDDEN);
    }

    if (fields.title) {
      const authorHasStoryWithSameTitle = await StoryUtils
        .checkSameTitle(this.repository, fields.title, existingStory.authorId);

      if (authorHasStoryWithSameTitle) {
        throw new RequestError(Messages.STORY_WITH_SAME_TITLE, StatusCodes.CONFLICT);
      }
    }

    const editedStory = await this.repository.editFields(id, fields);
    return editedStory;
  };
}

export default StoryEditService;
