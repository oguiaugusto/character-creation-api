import { PrismaClient } from '@prisma/client';
import { IUserDTO } from '../../interfaces/IUser';
import { IUserRepository } from './IUserRepository';

class PrismaUserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public create = async (user: IUserDTO) => {
    const newUser = await this.prisma.user.create({ data: user });

    return newUser;
  };

  public findByUsername = async (username: string) => {
    const user = await this.prisma.user.findUnique({ where: { username } });

    return user;
  };
}

export default PrismaUserRepository;
