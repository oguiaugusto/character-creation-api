import { IUser } from '../../interfaces';

export interface IUserRepository {
  create: (user: IUser) => Promise<IUser>;
  // update: (user: IUser) => Promise<IUser>;
  // remove: (id: string) => Promise<IUser>;
  // findById: (id: string) => Promise<IUser>;
  // findAll: () => Promise<IUser[]>;
}
