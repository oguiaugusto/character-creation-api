import { PrismaClient } from '@prisma/client';
import { IStoryDTO } from '../../interfaces/IStory';
import { IStoryRepository } from './IStoryRepository';

class PrismaStoryRepository implements IStoryRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public create = async (story: IStoryDTO) => (
    this.prisma.story.create({ data: story })
  );

  public findById = async (id: string) => (
    this.prisma.story.findUnique({ where: { id } })
  );

  public findByTitle = async (title: string) => (
    this.prisma.story.findMany({ where: { title } })
  );

  public findByAuthor = async (authorId: string) => (
    this.prisma.story.findMany({ where: { authorId } })
  );

  public editFields = async (id: string, fields: Partial<IStoryDTO>) => (
    this.prisma.story.update({ where: { id }, data: fields })
  );

  public remove = async (id: string) => (
    this.prisma.story.delete({ where: { id } })
  );
}

export default PrismaStoryRepository;
