import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ReqWithUser } from '../../../middlewares/userAuth';
import { IStoryCreateService } from './StoryCreateService';

class StoryCreateController {
  constructor(private service: IStoryCreateService) {
    this.service = service;
  }

  public handle = async (req: ReqWithUser, res: Response) => {
    const { title, description, picture } = req.body;
    const { id: authorId } = req.user;

    const story = await this.service.handle({
      title,
      description: description || null,
      picture: picture || null,
      authorId,
    });

    res.status(StatusCodes.CREATED).json(story);
  };
}

export default StoryCreateController;
