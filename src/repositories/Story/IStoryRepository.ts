import { IStory, IStoryDTO } from '../../interfaces/IStory';

export interface IStoryRepository {
  create(story: IStoryDTO): Promise<IStory>;
  findById(id: string): Promise<IStory | null>;
  findByTitle(title: string): Promise<IStory[]>;
  findByAuthor(authorId: string): Promise<IStory[]>;
  editFields(id: string, fields: Partial<IStoryDTO>): Promise<IStory>;
}
