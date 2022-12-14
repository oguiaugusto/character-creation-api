import { IUser, IUserDTO } from '../../interfaces/IUser';

export interface IUserRepository {
  create(user: IUserDTO): Promise<IUser>;
  findByUsername(username: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
}
