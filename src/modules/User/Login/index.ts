import { userRepository } from '../../../repositories';
import jwtUser from '../../../utils/JWTUser';
import UserLoginController from './UserLoginController';
import UserLoginService from './UserLoginService';

const userLoginService = new UserLoginService(
  userRepository,
  jwtUser,
);
const userLoginController = new UserLoginController(userLoginService);

export { userLoginService, userLoginController };
