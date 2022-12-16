import { v4 } from 'uuid';
import { IStory } from '../../interfaces/IStory';
import { userMock } from './userMock';

const storyMock: IStory = {
  id: v4(),
  title: 'story title',
  description: 'story description',
  picture: 'https://story-picture.com',
  authorId: userMock.id,
};

const storyMockOnlyRequiredFields = {
  id: v4(),
  title: 'story title 2',
  description: null,
  picture: null,
  authorId: userMock.id,
};

const storyDTOMock = {
  title: storyMock.title,
  description: storyMock.description,
  picture: storyMock.picture,
};

const storiesMock = [
  storyMock,
  storyMockOnlyRequiredFields,
]

export { storyMock, storyMockOnlyRequiredFields, storyDTOMock, storiesMock };
