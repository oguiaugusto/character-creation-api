import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IStoryEditService } from './StoryEditService';

class StoryEditController {
  constructor(private service: IStoryEditService) {
    this.service = service;
  }

  public handle = async (req: Request, res: Response) => {
    const { id } = req.params;
    const editedStory = await this.service.handle(id, req.body);

    res.status(StatusCodes.OK).json(editedStory);
  };
}

export default StoryEditController;
