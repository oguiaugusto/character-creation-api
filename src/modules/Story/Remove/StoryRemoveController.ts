import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ReqWithUser } from '../../../middlewares/userAuth';
import { IStoryRemoveService } from './StoryRemoveService';

class StoryRemoveController {
  constructor(private service: IStoryRemoveService) {
    this.service = service;
  }

  public handle = async (req: ReqWithUser, res: Response) => {
    const {
      params: { id: storyId },
      user: { id: authorId },
    } = req;

    await this.service.handle(storyId, authorId);
    res.status(StatusCodes.NO_CONTENT).end();
  };
}

export default StoryRemoveController;
