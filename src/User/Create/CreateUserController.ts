import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ICreateUserService } from './CreateUserService';

class CreateUserController {
  constructor(private service: ICreateUserService) {
    this.service = service;
  }

  public handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password, picture } = req.body;
      const user = await this.service.handle({ username, password, picture });

      return res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
      next(error);
    }
  };
}

export default CreateUserController;
