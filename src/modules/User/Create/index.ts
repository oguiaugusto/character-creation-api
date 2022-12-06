import { memoryUserRepository } from '../../../repositories';
import jwtUser from '../../../utils/JWTUser';
import UserCreateController from './UserCreateController';
import UserCreateService from './UserCreateService';

const userCreateService = new UserCreateService(
  memoryUserRepository,
  jwtUser,
);
const userCreateController = new UserCreateController(userCreateService);

export { userCreateController };
