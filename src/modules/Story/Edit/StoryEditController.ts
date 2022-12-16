import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ReqWithUser } from '../../../middlewares/userAuth';
import { IStoryEditService } from './StoryEditService';

class StoryEditController {
  constructor(private service: IStoryEditService) {
    this.service = service;
  }

  public handle = async (req: ReqWithUser, res: Response) => {
    const {
      params: { id: storyId },
      user: { id: authorId },
    } = req;

    const editedStory = await this.service.handle(storyId, authorId, req.body);
    res.status(StatusCodes.OK).json(editedStory);
  };
}

export default StoryEditController;
