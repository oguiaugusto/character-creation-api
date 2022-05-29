/**
 * @jest-environment ./prisma/environment-jest.js
 */

import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import app from '../../../api/app';

const regularUser = { username: 'user', password: '123456', picture: 'picture.png' };
const existingUser = { username: 'existingUser', password: '123456', picture: 'picture.png' };

describe('Test endpoint POST /users', () => {
  const getResponse = async (body?: string | object | undefined) => (
    request(app).post('/users').send(body)
  );

  it('should return status 201 and an user if it is created', async () => {
    const response = await getResponse(regularUser);

    expect(response.statusCode).toBe(StatusCodes.CREATED);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('username');
    expect(response.body).toHaveProperty('password');
    expect(response.body).toHaveProperty('picture');
    expect(response.body).toHaveProperty('admin');
    expect(response.body.admin).toBe(false);
  });

  it('should not be possible to create user with existing username', async () => {
    await request(app).post('/users').send(existingUser);
    const response = await request(app).post('/users').send(existingUser);

    expect(response.statusCode).toBe(StatusCodes.CONFLICT);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('User already exists');
  });

  it('should not be possible to create a user without username being a string', async () => {
    const response = await getResponse({ ...regularUser, username: 123 });

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('"username" must be a string');
  });

  it('should not be possible to create a user with username length smaller than 3', async () => {
    const response = await getResponse({ ...regularUser, username: 'Us' });

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('"username" length must be at least 3 characters long');
  });

  it('should not be possible to create a user with username containing spaces', async () => {
    const response = await getResponse({ ...regularUser, username: 'Invalid Username' });

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('"username", must not contain whitespaces');
  });

  it('should not be possible to create a user without username being a string', async () => {
    const response = await getResponse({ ...regularUser, password: ['this is an array'] });

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('"password" must be a string');
  });

  it('should not be possible to create a user with password length smaller than 6', async () => {
    const response = await getResponse({ ...regularUser, password: '12345' });

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('"password" length must be at least 6 characters long');
  });

  it('should not be possible to create a user if picture is passed but not a string', async () => {
    const response = await getResponse({ ...regularUser, picture: 123 });

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('"picture" must be a string');
  });

  it('should be possible to create a user without the picture', async () => {
    const response = await getResponse({ username: 'userWithoutPicture', password: '123456' });

    expect(response.statusCode).toBe(StatusCodes.CREATED);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('username');
    expect(response.body).toHaveProperty('password');
    expect(response.body).toHaveProperty('picture');
    expect(response.body).toHaveProperty('admin');
    expect(response.body.admin).toBe(false);
    expect(response.body.picture).toBeNull();
  });
});
