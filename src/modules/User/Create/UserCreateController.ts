import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IUserCreateService } from './UserCreateService';

class UserCreateController {
  constructor(private service: IUserCreateService) {
    this.service = service;
  }

  public handle = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await this.service.handle({ username, password });

    return res.status(StatusCodes.CREATED).json(user);
  };
}

export default UserCreateController;
