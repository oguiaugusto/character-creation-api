import chai from 'chai';
import chaiHttp from 'chai-http';
import { StatusCodes } from 'http-status-codes';
import { app } from '../../api/app';
import { Messages } from '../../utils';

chai.use(chaiHttp);
const { expect } = chai;

describe('Endpoint GET /', () => {
  const request = async () => chai.request(app).get('/');

  it(`should return status 200 and message: "${Messages.SERVER_ONLINE}"`, async () => {
    const response = await request();

    expect(response.status).to.be.equal(StatusCodes.OK);
    expect(response.body).to.have.property('message', Messages.SERVER_ONLINE);
  });
});
