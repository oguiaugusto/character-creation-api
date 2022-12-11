import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { StatusCodes } from 'http-status-codes';
import { Messages } from '../../utils';
import { userMock } from '../mocks/userMock';
import { userCreateService } from '../../modules/User/Create';
import { IUser, IUserDTO } from '../../interfaces/IUser';
import jwtUser from '../../utils/JWTUser';
import createChaiRequest from '../utils/createChaiRequest';
import validateCredentials from '../utils/validateCredentials';

chai.use(chaiHttp);
const { expect } = chai;
const ENDPOINT = '/users';

describe(`Endpoint POST ${ENDPOINT}`, () => {
  const request = createChaiRequest(ENDPOINT);

  let mockedRepositoryFind: sinon.SinonStub<[username: string], Promise<IUser | null>>;
  let mockedRepositoryCreate: sinon.SinonStub<[user: IUserDTO], Promise<IUser>>;

  before(() => {
    mockedRepositoryFind = sinon.stub(userCreateService.repository, 'findByUsername');
    mockedRepositoryCreate = sinon.stub(userCreateService.repository, 'create');
  });

  after(() => {
    mockedRepositoryFind.restore();
    mockedRepositoryCreate.restore();
  });

  describe('On sucess', () => {
    before(() => {
      mockedRepositoryFind.resolves(null);
      mockedRepositoryCreate.resolves(userMock);
    });

    after(() => {
      mockedRepositoryFind.reset();
      mockedRepositoryCreate.reset();
    }); // "after" is not really needed in this case, since i'm replacing the stubs in the next "before" hook

    it('should return status 201 and body with user and token', async () => {
      const response = await request({ username: userMock.username, password: userMock.password });
      const decodedToken = jwtUser.verify(response.body.token).data;

      expect(response.status).to.be.equal(StatusCodes.CREATED);
      expect(response.body.user).to.be.eql(decodedToken);
    });
  });

  describe('On fail', () => {
    before(() => {
      mockedRepositoryFind.resolves(userMock);
      mockedRepositoryCreate.resolves(userMock); // This is not necessary, but it's here to avoid a warning
    });

    after(() => {
      mockedRepositoryFind.reset();
      mockedRepositoryCreate.reset();
    });

    it(`should return status 409 and message: "${Messages.USER_ALREADY_EXISTS}"`, async () => {
      const response = await request({ username: userMock.username, password: userMock.password });

      expect(response.status).to.be.equal(StatusCodes.CONFLICT);
      expect(response.body).to.have.property('message', Messages.USER_ALREADY_EXISTS);
    });

    validateCredentials(ENDPOINT);
  });
});
