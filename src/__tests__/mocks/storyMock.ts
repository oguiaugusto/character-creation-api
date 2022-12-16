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

const storyEditedMock: IStory = {
  id: storyMock.id,
  title: 'story title edited',
  description: 'story description edited',
  picture: 'https://story-picture-edited.com',
  authorId: userMock.id,
};

const storyEditedDTOMock = {
  title: storyEditedMock.title,
  description: storyEditedMock.description,
  picture: storyEditedMock.picture,
};

const storiesMock = [
  storyMock,
  storyMockOnlyRequiredFields,
]

export {
  storyMock,
  storyMockOnlyRequiredFields,
  storyDTOMock,
  storyEditedMock,
  storyEditedDTOMock,
  storiesMock,
};
