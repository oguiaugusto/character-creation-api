import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { IEncoder } from '../../../interfaces/IEncoder';
import { IUserDTO, IUserLogged } from '../../../interfaces/IUser';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { Messages, RequestError } from '../../../utils';

export interface IUserLoginService {
  handle(user: IUserDTO): Promise<IUserLogged>;
}

class UserLoginService {
  constructor(
    public repository: IUserRepository,
    private encoder: IEncoder,
  ) {
    this.repository = repository;
  }

  public handle = async (user: IUserDTO) => {
    const { username, password } = user;

    const existingUser = await this.repository.findByUsername(username);
    if (!existingUser) {
      throw new RequestError(Messages.USER_NOT_FOUND_USERNAME, StatusCodes.NOT_FOUND);
    }

    const matchingPassword = bcrypt.compareSync(password, existingUser.password);
    if (!matchingPassword) {
      throw new RequestError(Messages.INVALID_PASSWORD, StatusCodes.UNAUTHORIZED);
    }

    const userPublic = { id: existingUser.id, username: existingUser.username };
    const token = this.encoder.sign(userPublic);

    return { user: userPublic, token };
  };
}

export default UserLoginService;
