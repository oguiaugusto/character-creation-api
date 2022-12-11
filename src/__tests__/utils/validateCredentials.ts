import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import { userMock } from '../mocks/userMock';
import createChaiRequest from './createChaiRequest';

const validateCredentials = (endpoint: string) => {
  const request = createChaiRequest(endpoint);

  it('should return status 400 and a message indicating that username is required', async () => {
    const response = await request({ password: userMock.password });

    expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
    expect(response.body).to.have.property('message');

    expect(response.body.message).to.include('username');
    expect(response.body.message).to.include('required');
  });

  it('should return status 400 and a message indicating that password is required', async () => {
    const response = await request({ username: userMock.username });

    expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
    expect(response.body).to.have.property('message');

    expect(response.body.message).to.include('password');
    expect(response.body.message).to.include('required');
  });

  it('should return status 422 and a message indicating that password must be at least 6 characters long', async () => {
    const response = await request({ username: userMock.username, password: '12345' });

    expect(response.status).to.be.equal(StatusCodes.UNPROCESSABLE_ENTITY);
    expect(response.body).to.have.property('message');
    
    expect(response.body.message).to.include('password');
    expect(response.body.message).to.include('6 characters');
  });

  it('should return status 422 and a message indicating that the username must be between 3 and 20 characters', async () => {
    const response1 = await request({ username: '12', password: userMock.password });
    const response2 = await request({ username: '123456789012345678901', password: userMock.password });

    expect(response1).to.have.property('status', StatusCodes.UNPROCESSABLE_ENTITY);
    expect(response2).to.have.property('status', StatusCodes.UNPROCESSABLE_ENTITY);

    expect(response1.body).to.have.property('message');
    expect(response2.body).to.have.property('message');

    expect(response1.body.message).to.include('username');
    expect(response1.body.message).to.include('3 characters');

    expect(response2.body.message).to.include('username');
    expect(response2.body.message).to.include('20 characters');
  });
};

export default validateCredentials; 
