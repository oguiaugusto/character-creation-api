import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import CreateChaiRequest from '../utils/CreateChaiRequest';
import jwtUser from '../../utils/JWTUser';
import { StatusCodes } from 'http-status-codes';
import { userMock, userPublicMock } from '../mocks/userMock';
import { IStory } from '../../interfaces/IStory';
import { storiesMock } from '../mocks/storyMock';
import { mockUserFindById, restoreUserFindById } from '../utils/passUserAuth';
import { storyGetMyStoriesService } from '../../modules/Story/GetMyStories';
import { IUser } from '../../interfaces/IUser';
import { Messages } from '../../utils';

chai.use(chaiHttp);
const { expect } = chai;
const ENDPOINT = '/stories/my-stories';

describe('Endpoint POST /stories', () => {
  const validToken = jwtUser.sign(userPublicMock);
  const request = CreateChaiRequest.getWithToken(ENDPOINT, validToken);

  let mockedRepositoryFindByAuthor: sinon.SinonStub<[authorId: string], Promise<IStory[]>>;
  let mockedRepositoryUserFindById: sinon.SinonStub<[id: string], Promise<IUser | null>>;

  before(() => {
    mockedRepositoryFindByAuthor = sinon.stub(storyGetMyStoriesService.repository, 'findByAuthor');

    mockUserFindById();
  });

  after(() => {
    mockedRepositoryFindByAuthor.restore();
    mockedRepositoryUserFindById.restore();

    restoreUserFindById();
  });

  describe('On success', () => {
    before(() => {
      restoreUserFindById();
      mockedRepositoryUserFindById = sinon.stub(storyGetMyStoriesService.userRepository, 'findById');

      mockedRepositoryUserFindById.resolves(userMock);
    });

    after(() => {
      mockedRepositoryFindByAuthor.reset();
      mockedRepositoryUserFindById.reset();
    });

    it('should return status 200 and the stories from the author', async () => {
      mockedRepositoryFindByAuthor.resolves(storiesMock);
      const response = await request();

      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body).to.have.property('stories');
      expect(response.body.stories).to.be.eql(storiesMock);
    });

    it('should return status 200 and an empty stories array if there isn\'t any story', async () => {
      mockedRepositoryFindByAuthor.resolves([]);
      const response = await request();

      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body).to.have.property('stories');
      expect(response.body.stories).to.be.empty;
    });
  });

  describe('On failure', () => {
    before(() => {
      mockedRepositoryUserFindById.onFirstCall().resolves(userMock);
      mockedRepositoryUserFindById.onSecondCall().resolves(null);

      mockedRepositoryFindByAuthor.resolves([]); // not necessary, but it's here to avoid errors
    });

    after(() => {
      mockedRepositoryFindByAuthor.reset();
      mockedRepositoryUserFindById.reset();
    });

    it(`should return status 404 and message: "${Messages.AUTHOR_DOES_NOT_EXIST}" if so`, async () => {
      const response = await request();

      expect(response.status).to.be.equal(StatusCodes.NOT_FOUND);
      expect(response.body).to.have.property('message', Messages.AUTHOR_DOES_NOT_EXIST);
    });
  });
});
