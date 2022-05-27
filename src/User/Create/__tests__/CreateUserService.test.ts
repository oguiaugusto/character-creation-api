import { StatusCodes } from 'http-status-codes';
import * as utils from '../../../utils';
import CreateUserService from '../CreateUserService';
import MockCreateRepository from './mocks/MockCreateRepository';

const IDS = ['USR10003', 'USR10002'];

describe('Test CreateUserService class', () => {
  const repository = new MockCreateRepository();
  const createUserService = new CreateUserService(repository);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('createNewId returns a new id', async () => {
    jest.spyOn(utils, 'getRandomId').mockReturnValue(IDS[0]);

    const newId = await createUserService.createNewId();

    expect(newId).toBe(IDS[0]);
  });

  it('createNewId does not return a repeated id', async () => {
    jest.spyOn(utils, 'getRandomId').mockReturnValueOnce(IDS[1]);
    jest.spyOn(utils, 'getRandomId').mockReturnValueOnce(IDS[0]);

    const newId = await createUserService.createNewId();

    expect(utils.getRandomId).toBeCalledTimes(2);
    expect(newId).toBe(IDS[0]);
  });

  it('handle throws an error if repository returns null', async () => {
    jest.spyOn(repository, 'create').mockResolvedValueOnce(null);

    try {
      await createUserService.handle({ username: '', password: '', picture: '' });
    } catch (error) {
      expect(error instanceof utils.RequestError).toBe(true);

      if (error instanceof utils.RequestError) {
        expect(error.status).toBe(StatusCodes.CONFLICT);
        expect(error.message).toBe('User already exists');
      }
    }
  });

  it('handle returns an user if repository returns an user', async () => {
    jest.spyOn(utils, 'getRandomId').mockReturnValue(IDS[0]);

    const userDTO = { username: 'User', password: '1234', picture: '' };
    const newUser = await createUserService.handle(userDTO);

    expect(newUser).toEqual({ id: IDS[0], ...userDTO, admin: false });
  });
});
