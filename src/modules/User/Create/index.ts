import { userRepository } from '../../../repositories';
import jwtUser from '../../../utils/JWTUser';
import UserCreateController from './UserCreateController';
import UserCreateService from './UserCreateService';

const userCreateService = new UserCreateService(
  userRepository,
  jwtUser,
);
const userCreateController = new UserCreateController(userCreateService);

export { userCreateService, userCreateController };
