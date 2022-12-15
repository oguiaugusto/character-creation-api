import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import CreateChaiRequest from '../utils/CreateChaiRequest';
import userAuth from '../../middlewares/userAuth';
import { IUser, IUserDecoded } from '../../interfaces/IUser';
import { Messages } from '../../utils';
import { StatusCodes } from 'http-status-codes';
import jwtUser from '../../utils/JWTUser';
import { userMock } from '../mocks/userMock';
import { TokenExpiredError } from 'jsonwebtoken';

chai.use(chaiHttp);
const { expect } = chai;

describe('UserAuth middleware', () => {
  const request = CreateChaiRequest.post('/stories');
  const requestWithToken = (token: string) => CreateChaiRequest.postWithToken('/stories', token)();

  let mockedRepositoryFindById: sinon.SinonStub<[id: string], Promise<IUser | null>>;
  let mockedEncoderVerify: sinon.SinonStub<[userToken: string], IUserDecoded>;

  before(() => {
    mockedRepositoryFindById = sinon.stub(userAuth.repository, 'findById');
  });

  after(() => {
    mockedRepositoryFindById.restore();
  });

  it(`should return 401 and message: "${Messages.TOKEN_NOT_PROVIDED}" when no token is provided`, async () => {
    const response = await request();

    expect(response.status).to.be.equal(StatusCodes.UNAUTHORIZED);
    expect(response.body.message).to.be.equal(Messages.TOKEN_NOT_PROVIDED);
  });

  it(`should return 401 and message: "${Messages.INVALID_TOKEN}" if token is invalid (not decoded)`, async () => {
    const response = await requestWithToken('invalid-token');

    expect(response.status).to.be.equal(StatusCodes.UNAUTHORIZED);
    expect(response.body.message).to.be.equal(Messages.INVALID_TOKEN);
  });

  it(`should return 401 and message: "${Messages.TOKEN_EXPIRED}" if token has expired`, async () => {
    mockedEncoderVerify = sinon.stub(userAuth.encoder, 'verify');
    mockedEncoderVerify.throws(new TokenExpiredError('message', new Date()));

    const response = await requestWithToken('expired-token');

    expect(response.status).to.be.equal(StatusCodes.UNAUTHORIZED);
    expect(response.body.message).to.be.equal(Messages.TOKEN_EXPIRED);

    mockedEncoderVerify.restore();
  });

  it(`should return 401 and message: "${Messages.INVALID_TOKEN}" if token is invalid (user not found)`, async () => {
    mockedRepositoryFindById.resolves(null);
    const validToken = jwtUser.sign(userMock);

    const response = await requestWithToken(validToken);

    expect(response.status).to.be.equal(StatusCodes.UNAUTHORIZED);
    expect(response.body.message).to.be.equal(Messages.INVALID_TOKEN);
  });
});
