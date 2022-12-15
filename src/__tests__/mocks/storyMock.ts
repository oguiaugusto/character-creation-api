import { v4 } from 'uuid';
import { IStory } from '../../interfaces/IStory';
import { userMock } from './userMock';

const storyMock: IStory = {
  id: v4(),
  title: 'story title',
  description: 'story description',
  picture: 'story picture',
  authorId: userMock.id,
};

const storyDTOMock = {
  title: storyMock.title,
  description: storyMock.description,
  picture: storyMock.picture,
}

export { storyMock, storyDTOMock };
