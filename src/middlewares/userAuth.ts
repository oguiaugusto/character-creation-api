import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IEncoder } from '../interfaces/IEncoder';
import { IUserPublic } from '../interfaces/IUser';
import { userRepository } from '../repositories/User';
import { IUserRepository } from '../repositories/User/IUserRepository';
import { Messages, RequestError } from '../utils';
import jwtUser from '../utils/JWTUser';

export type ReqWithUser = Request & { user: IUserPublic };

class UserAuth {
  constructor(
    public repository: IUserRepository,
    private encoder: IEncoder,
  ) {
    this.repository = repository;
  }

  public handle = async (req: ReqWithUser, _res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new RequestError(Messages.TOKEN_NOT_PROVIDED, StatusCodes.UNAUTHORIZED);
    }

    const decodedUser = this.encoder.verify(token);
    const user = await this.repository.findById(decodedUser.data.id);

    if (!user) {
      throw new RequestError(Messages.INVALID_TOKEN, StatusCodes.UNAUTHORIZED);
    }

    req.user = decodedUser.data;
    next();
  };
}

export default new UserAuth(userRepository, jwtUser);
