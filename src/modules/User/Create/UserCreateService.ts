import { StatusCodes } from 'http-status-codes';
import { IUserDTO } from '../../../interfaces/IUser';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { Messages, RequestError } from '../../../utils';

export interface IUserCreateService {
  handle(user: IUserDTO): Promise<{ id: string; username: string }>;
}

class UserCreateService implements IUserCreateService {
  constructor(private repository: IUserRepository) {
    this.repository = repository;
  }

  public handle = async (user: IUserDTO) => {
    const existingUser = await this.repository.findByUsername(user.username);
    if (existingUser) {
      throw new RequestError(Messages.USER_ALREADY_EXISTS, StatusCodes.CONFLICT);
    }

    const newUser = await this.repository.create(user);
    return { id: newUser.id, username: newUser.username };
  };
}

export default UserCreateService;
