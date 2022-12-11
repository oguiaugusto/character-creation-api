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

chai.use(chaiHttp);
const { expect } = chai;

describe('Endpoint POST /users', () => {
  const request = createChaiRequest('/users');

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
  });
});
