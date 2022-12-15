import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import randomString from 'randomstring';
import CreateChaiRequest from './CreateChaiRequest';

const createRequest = (endpoint: string, token: string) => CreateChaiRequest.postWithToken(endpoint, token);

const validateTitle = (endpoint: string, token: string) => {
  const request = createRequest(endpoint, token);

  it('should return status 400 and a message indicating that the title is required', async () => {
    const response = await request({});

    expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
    expect(response.body).to.have.property('message');

    expect(response.body.message).to.include('title');
    expect(response.body.message).to.include('required');
  });

  it('should return status 422 and a message indicating that the title must be between 3 and 20 characters', async () => {
    const response1 = await request({ title: '12' });
    const response2 = await request({ title: randomString.generate(101) });

    expect(response1).to.have.property('status', StatusCodes.UNPROCESSABLE_ENTITY);
    expect(response2).to.have.property('status', StatusCodes.UNPROCESSABLE_ENTITY);

    expect(response1.body).to.have.property('message');
    expect(response2.body).to.have.property('message');

    expect(response1.body.message).to.include('title');
    expect(response1.body.message).to.include('3 characters');

    expect(response2.body.message).to.include('title');
    expect(response2.body.message).to.include('100 characters');
  });
};

const validateDescription = async (endpoint: string, token: string) => {
  const request = createRequest(endpoint, token);

  it('should return status 422 and a message indicating that the description must be between 3 and 510 characters', async () => {
    const response1 = await request({ title: 'title', description: '12' });
    const response2 = await request({ title: 'title', description: randomString.generate(511) });

    expect(response1).to.have.property('status', StatusCodes.UNPROCESSABLE_ENTITY);
    expect(response2).to.have.property('status', StatusCodes.UNPROCESSABLE_ENTITY);

    expect(response1.body).to.have.property('message');
    expect(response2.body).to.have.property('message');

    expect(response1.body.message).to.include('description');
    expect(response1.body.message).to.include('3 characters');

    expect(response2.body.message).to.include('description');
    expect(response2.body.message).to.include('510 characters');
  });
};

const validatePicture = (endpoint: string, token: string) => {
  const request = createRequest(endpoint, token);

  it('should return status 422 and a message indicating that the picture must be a valid URL', async () => {
    const response = await request({ title: 'title', picture: 'invalidURL' });

    expect(response).to.have.property('status', StatusCodes.UNPROCESSABLE_ENTITY);
    expect(response.body).to.have.property('message');

    expect(response.body.message).to.include('picture');
    expect(response.body.message).to.include('valid uri');
  });
};

const validateStoryFields = (endpoint: string, token: string) => {
  validateTitle(endpoint, token);
  validateDescription(endpoint, token);
  validatePicture(endpoint, token);
};

export {
  validateTitle,
  validateDescription,
  validatePicture,
}
export default validateStoryFields;
