import { repository } from '..';
import CreateUserController from './CreateUserController';
import CreateUserService from './CreateUserService';

const createService = new CreateUserService(repository);
const createController = new CreateUserController(createService);

export {
  createController,
};
