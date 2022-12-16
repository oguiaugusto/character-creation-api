import { v4 } from 'uuid';
import { IUser, IUserPublic } from '../../interfaces/IUser';

const userMock: IUser = {
  id: v4(),
  username: 'user',
  password: '123456'
};

const userPublicMock: IUserPublic = {
  id: userMock.id,
  username: userMock.username,
}

const anotherUserMock: IUser = {
  id: v4(),
  username: 'anotherUser',
  password: '123456'
}

const anotherUserPublicMock: IUserPublic = {
  id: anotherUserMock.id,
  username: anotherUserMock.username,
};

export {
  userMock,
  userPublicMock,
  anotherUserMock,
  anotherUserPublicMock,
};
