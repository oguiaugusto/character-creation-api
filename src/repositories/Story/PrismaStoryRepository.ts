import { PrismaClient } from '@prisma/client';
import { IStoryDTO } from '../../interfaces/IStory';
import { IStoryRepository } from './IStoryRepository';

class PrismaStoryRepository implements IStoryRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public create = async (story: IStoryDTO) => {
    const newStory = await this.prisma.story.create({ data: story });

    return newStory;
  };

  public findById = async (id: string) => {
    const story = await this.prisma.story.findUnique({ where: { id } });

    return story;
  };

  public findByTitle = async (title: string) => {
    const story = await this.prisma.story.findMany({ where: { title } });

    return story;
  };
}

export default PrismaStoryRepository;
