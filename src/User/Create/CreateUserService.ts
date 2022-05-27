import { StatusCodes } from 'http-status-codes';
import { IUserDTO } from '../../interfaces';
import { getRandomId, RequestError } from '../../utils';
import { ICreateUserRepository } from '../repositories/IUserRepository';

class CreateUserService {
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
    const id = await this.createNewId();
    const user = await this.repository.create({ id, username, password, picture });

    if (!user) throw new RequestError(StatusCodes.CONFLICT, 'User already exists');
    return user;
  };
}

export default CreateUserService;
