import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CreateUserController from '../CreateUserController';
import { IDS, userDTO } from './mocks';
import MockCreateService from './mocks/MockCreateService';

describe('Test CreateUserController class', () => {
  const req: Request = { body: {} } as Request;
  const res: Response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();

  const createUserService = new MockCreateService();
  const createUserController = new CreateUserController(createUserService);

  it('returns response status 201 and a user', async () => {
    req.body = userDTO;
    await createUserController.handle(req, res, next);

    expect(res.status).toBeCalledWith(StatusCodes.CREATED);
    expect(res.json).toBeCalledWith({
      id: IDS[0], ...userDTO, admin: false,
    });
  });
  it('if an error is catched, next function is called', async () => {
    req.body = { username: 'ERROR' };
    await createUserController.handle(req, res, next);

    expect(next).toBeCalled();
    expect(next).toBeCalledTimes(1);
  });
});
