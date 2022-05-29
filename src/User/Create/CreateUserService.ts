import { StatusCodes } from 'http-status-codes';
import { IUser, IUserDTO } from '../../interfaces';
import { getRandomId, RequestError } from '../../utils';
import { ICreateUserRepository } from '../repositories/IUserRepository';

export interface ICreateUserService {
  createNewId: () => Promise<string>;
  handle: (user: IUserDTO) => Promise<IUser>;
}

class CreateUserService implements ICreateUserService {
  constructor(private repository: ICreateUserRepository) {
    this.repository = repository;
  }

  public createNewId = async () => {
    const ids = await this.repository.findAllIds();
    let newId = getRandomId('USR');
    while (ids.includes(newId)) {
      newId = getRandomId('USR');
    }

    return newId;
  };

  public handle = async ({ username, password, picture }: IUserDTO) => {
    if (username.includes(' ')) {
      throw new RequestError(StatusCodes.BAD_REQUEST, '"username", must not contain whitespaces');
    }

    const id = await this.createNewId();
    const user = await this.repository.create({ id, username, password, picture });

    if (!user) throw new RequestError(StatusCodes.CONFLICT, 'User already exists');
    return user;
  };
}

export default CreateUserService;
