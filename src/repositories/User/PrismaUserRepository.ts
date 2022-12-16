import { PrismaClient } from '@prisma/client';
import { IUserDTO } from '../../interfaces/IUser';
import { IUserRepository } from './IUserRepository';

class PrismaUserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public create = async (user: IUserDTO) => (
    this.prisma.user.create({ data: user })
  );

  public findByUsername = async (username: string) => (
    this.prisma.user.findUnique({ where: { username } })
  );

  public findById = async (id: string) => (
    this.prisma.user.findUnique({ where: { id } })
  );
}

export default PrismaUserRepository;
