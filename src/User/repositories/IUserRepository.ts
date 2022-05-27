import { IUser, IUserDTOWithId } from '../../interfaces';

export interface ICreateUserRepository {
  findAllIds: () => Promise<string[]>;
  create: (user: IUserDTOWithId) => Promise<IUser | null>;
}

export interface IUpdateUserRepository {
  update: (user: IUser) => Promise<IUser>;
}
export interface IRemoveUserRepository {
  remove: (id: string) => Promise<IUser>;
}
export interface IFindByIdUserRepository {
  findById: (id: string) => Promise<IUser>;
}
export interface IFindAllUserRepository {
  findAll: () => Promise<IUser[]>;
}

export interface IUserRepository extends
ICreateUserRepository,
IUpdateUserRepository,
IRemoveUserRepository,
IFindByIdUserRepository,
IFindAllUserRepository {}
