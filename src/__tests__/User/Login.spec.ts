import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { StatusCodes } from 'http-status-codes';
import { app } from '../../api/app';
import { Messages } from '../../utils';
import { userMock } from '../mocks/userMock';
import { userCreateService } from '../../modules/User/Create';
import { IUser } from '../../interfaces/IUser';
import jwtUser from '../../utils/JWTUser';
import Encrypter from '../../utils/Encrypter';
import CreateChaiRequest from '../utils/CreateChaiRequest';
import validateCredentials from '../utils/validateCredentials';

chai.use(chaiHttp);
const { expect } = chai;
const ENDPOINT = '/users/login';

describe(`Endpoint POST ${ENDPOINT}`, () => {
  const request = CreateChaiRequest.post(ENDPOINT);
  let mockedRepositoryFind: sinon.SinonStub<[username: string], Promise<IUser | null>>;

  before(() => {
    mockedRepositoryFind = sinon.stub(userCreateService.repository, 'findByUsername');
  });

  after(() => { mockedRepositoryFind.restore(); });

  describe('On sucess', () => {
    before(async () => {
      const encryptedPassword = await Encrypter.encrypt(userMock.password);
      mockedRepositoryFind.resolves({ ...userMock, password: encryptedPassword });
    });

    after(() => { mockedRepositoryFind.reset(); });

    it('should return status 200 and body with user and token', async () => {
      const response = await request({ username: userMock.username, password: userMock.password });
      const decodedToken = jwtUser.verify(response.body.token).data;

      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body.user).to.be.eql(decodedToken)
      expect(response.body).to.have.property('token');
    });
  });

  describe('On failure', () => {
    after(() => { mockedRepositoryFind.reset(); });

    it(`should return status 404 and message: "${Messages.USER_NOT_FOUND_USERNAME}" if user does not exist`, async () => {
      mockedRepositoryFind.resolves(null);
      const response = await request({ username: 'unexistinguser', password: userMock.password });

      expect(response.status).to.be.equal(StatusCodes.NOT_FOUND);
      expect(response.body.message).to.be.equal(Messages.USER_NOT_FOUND_USERNAME);
    });

    it(`should return status 401 and message: "${Messages.INVALID_PASSWORD}" if password is invalid`, async () => {
      const encryptedPassword = await Encrypter.encrypt(userMock.password);
      mockedRepositoryFind.resolves({ ...userMock, password: encryptedPassword });

      const response = await request({ username: userMock.username, password: 'invalidpassword' });

      expect(response.status).to.be.equal(StatusCodes.UNAUTHORIZED);
      expect(response.body.message).to.be.equal(Messages.INVALID_PASSWORD);
    });

    validateCredentials(ENDPOINT);
  });
});
