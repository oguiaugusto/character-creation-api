import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IStoryRemoveService } from './StoryRemoveService';

class StoryRemoveController {
  constructor(private service: IStoryRemoveService) {
    this.service = service;
  }

  public handle = async (req: Request, res: Response) => {
    const { id } = req.params;

    await this.service.handle(id);
    res.status(StatusCodes.NO_CONTENT).end();
  };
}

export default StoryRemoveController;
