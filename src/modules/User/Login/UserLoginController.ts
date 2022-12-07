import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IUserLoginService } from './UserLoginService';

class UserLoginController {
  constructor(private service: IUserLoginService) {
    this.service = service;
  }

  public handle = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await this.service.handle({ username, password });

    res.status(StatusCodes.OK).json(user);
  };
}

export default UserLoginController;
