import { PrismaClient } from 'prisma/prisma-client';
import prismaClient from '../../database/prismaClient';
import { IUser, IUserDTOWithId } from '../../interfaces';
import { IUserRepository } from './IUserRepository';

class PostgreSQLRepository implements IUserRepository {
  constructor(
    private client: PrismaClient = prismaClient,
  ) {
    this.client = client;
  }

  findAllIds = async () => {
    const ids = await this.client.user.findMany({ select: { id: true } });
    return ids.map(({ id }) => id);
  };

  create = async ({ id, username, password, picture }: IUserDTOWithId) => {
    try {
      const user = await this.client.user.create({
        data: { id, username, password, picture },
      });

      return user;
    } catch (error) {
      return null;
    }
  };

  update = async (user: IUser) => {
    console.log(this);
    return user;
  };

  remove = async (id: string) => {
    console.log(this);
    return { id, username: '', password: '', picture: '' } as IUser;
  };

  findById = async (id: string) => {
    console.log(this);
    return { id, username: '', password: '', picture: '' } as IUser;
  };

  findAll = async () => {
    console.log(this);
    return [{ id: 'a', username: '', password: '', picture: '' } as IUser];
  };
}

export default PostgreSQLRepository;
