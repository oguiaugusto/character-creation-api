import { StatusCodes } from 'http-status-codes';
import { IEncoder } from '../../../interfaces/IEncoder';
import { IUserDTO, IUserLogged } from '../../../interfaces/IUser';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { Messages, RequestError } from '../../../utils';
import Encrypter from '../../../utils/Encrypter';

export interface IUserCreateService {
  handle(user: IUserDTO): Promise<IUserLogged>;
}

class UserCreateService implements IUserCreateService {
  constructor(
    private repository: IUserRepository,
    private encoder: IEncoder,
  ) {
    this.repository = repository;
  }

  public handle = async (user: IUserDTO) => {
    const existingUser = await this.repository.findByUsername(user.username);
    if (existingUser) {
      throw new RequestError(Messages.USER_ALREADY_EXISTS, StatusCodes.CONFLICT);
    }
    const encryptedPassword = await Encrypter.encrypt(user.password);

    const newUser = await this.repository.create({ ...user, password: encryptedPassword });
    const userPublic = { id: newUser.id, username: newUser.username };

    const token = this.encoder.sign(userPublic);
    return { user: userPublic, token };
  };
}

export default UserCreateService;
