import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ReqWithUser } from '../../../middlewares/userAuth';
import { IStoryGetMyStoriesService } from './StoryGetMyStoriesService';

class StoryGetMyStoriesController {
  constructor(private service: IStoryGetMyStoriesService) {
    this.service = service;
  }

  public handle = async (req: ReqWithUser, res: Response) => {
    const { id } = req.user;
    const stories = await this.service.handle(id);

    res.status(StatusCodes.OK).json(stories);
  };
}

export default StoryGetMyStoriesController;
