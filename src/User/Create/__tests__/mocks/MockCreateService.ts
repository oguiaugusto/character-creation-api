import { StatusCodes } from 'http-status-codes';
import { IDS } from '.';
import { IUserDTO } from '../../../../interfaces';
import { RequestError } from '../../../../utils';
import { ICreateUserService } from '../../CreateUserService';

class MockCreateService implements ICreateUserService {
  private id: string;

  constructor() {
    const [id] = IDS;
    this.id = id;
  }

  createNewId = async () => this.id;

  handle = async ({ username, password, picture }: IUserDTO) => {
    const id = await this.createNewId();

    if (username === 'ERROR') throw new RequestError(StatusCodes.INTERNAL_SERVER_ERROR, 'ISE');
    return { id, username, password, picture, admin: false };
  };
}

export default MockCreateService;
