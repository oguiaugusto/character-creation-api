import { memoryUserRepository } from '../../../repositories';
import UserCreateController from './UserCreateController';
import UserCreateService from './UserCreateService';

const userCreateService = new UserCreateService(memoryUserRepository);
const userCreateController = new UserCreateController(userCreateService);

export { userCreateController };
