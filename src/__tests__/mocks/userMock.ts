import { v4 } from 'uuid';
import { IUser } from '../../interfaces/IUser';

const userMock: IUser = {
  id: v4(),
  username: 'user',
  password: '123456'
};

export { userMock };
