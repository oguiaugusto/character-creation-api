import { memoryUserRepository } from '../../../repositories';
import jwtUser from '../../../utils/JWTUser';
import UserLoginController from './UserLoginController';
import UserLoginService from './UserLoginService';

const userLoginService = new UserLoginService(
  memoryUserRepository,
  jwtUser,
);
const userLoginController = new UserLoginController(userLoginService);

export { userLoginService, userLoginController };
