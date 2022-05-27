import { IUser, IUserDTOWithId } from '../../../../interfaces';
import { ICreateUserRepository } from '../../../repositories/IUserRepository';

class MockCreateRepository implements ICreateUserRepository {
  private ids: string[];

  private user: IUser;

  constructor() {
    this.ids = ['USR10001', 'USR10002'];
    this.user = { id: '', username: '', password: '', picture: '', admin: false };
  }

  findAllIds = async () => this.ids;

  create = async ({ id, username, password, picture }: IUserDTOWithId) => {
    if (id === 'NULL') return null;

    this.user = { id, username, password, picture, admin: false };
    return this.user;
  };
}

export default MockCreateRepository;
