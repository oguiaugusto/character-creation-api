import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import CreateChaiRequest from '../utils/CreateChaiRequest';
import jwtUser from '../../utils/JWTUser';
import { StatusCodes } from 'http-status-codes';
import { anotherUserMock, userPublicMock } from '../mocks/userMock';
import { IStory } from '../../interfaces/IStory';
import { storyRemoveService } from '../../modules/Story/Remove';
import { storyMock } from '../mocks/storyMock';
import { mockUserFindById, restoreUserFindById } from '../utils/passUserAuth';
import { Messages } from '../../utils';

chai.use(chaiHttp);
const { expect } = chai;
const ENDPOINT = (id: string) => `/stories/:${id}`;

describe('Endpoint DELETE /stories/:id', () => {
  const validToken = jwtUser.sign(userPublicMock);
  const anotherUserValidToken = jwtUser.sign(anotherUserMock);
  const request = (id: string) => CreateChaiRequest.deleteWithToken(ENDPOINT(id), validToken)();
  const requestWithAnotherUserToken = (id: string) => CreateChaiRequest.deleteWithToken(ENDPOINT(id), anotherUserValidToken)();

  let mockedRepositoryFindById: sinon.SinonStub<[id: string], Promise<IStory | null>>;
  let mockedRepositoryRemove: sinon.SinonStub<[id: string], Promise<IStory>>;

  before(() => {
    mockedRepositoryFindById = sinon.stub(storyRemoveService.repository, 'findById');
    mockedRepositoryRemove = sinon.stub(storyRemoveService.repository, 'remove');

    mockUserFindById();
  });

  after(() => {
    mockedRepositoryFindById.restore();
    mockedRepositoryRemove.restore();

    restoreUserFindById();
  });

  describe('On success', () => {
    before(() => {
      mockedRepositoryFindById.resolves(storyMock);
      mockedRepositoryRemove.resolves(storyMock);
    });

    after(() => {
      mockedRepositoryFindById.reset();
      mockedRepositoryRemove.reset();
    });

    it('should return status 204 and no body', async () => {
      const response = await request(storyMock.id);

      expect(response.status).to.be.equal(StatusCodes.NO_CONTENT);
      expect(response.body).to.be.eql({});
    });
  });

  describe('On failure', () => {
    before(() => {
      mockedRepositoryFindById.onFirstCall().resolves(null);
      mockedRepositoryFindById.onSecondCall().resolves(storyMock);

      mockedRepositoryRemove.resolves(storyMock); // This is not used
    });

    after(() => {
      mockedRepositoryFindById.reset();
      mockedRepositoryRemove.reset();
    });

    it(`should return status 404 and message: "${Messages.STORY_NOT_FOUND}" if so`, async () => {
      const response = await request(storyMock.id);

      expect(response.status).to.be.equal(StatusCodes.NOT_FOUND);
      expect(response.body).to.have.property('message', Messages.STORY_NOT_FOUND);
    });

    it(`should return status 403 and message: "${Messages.YOU_DONT_HAVE_PERMISSION}" if story is not from the request author`, async () => {
      const response = await requestWithAnotherUserToken(storyMock.id);

      expect(response.status).to.be.equal(StatusCodes.FORBIDDEN);
      expect(response.body).to.have.property('message', Messages.YOU_DONT_HAVE_PERMISSION);
    });
  });
});
