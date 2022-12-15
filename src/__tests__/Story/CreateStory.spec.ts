import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import CreateChaiRequest from '../utils/CreateChaiRequest';
import jwtUser from '../../utils/JWTUser';
import validateStoryFields from '../utils/validateStoryFields';
import { StatusCodes } from 'http-status-codes';
import { userPublicMock } from '../mocks/userMock';
import { IStory, IStoryDTO } from '../../interfaces/IStory';
import { storyCreateService } from '../../modules/Story/Create';
import { storyDTOMock, storyMock, storyMockOnlyRequiredFields } from '../mocks/storyMock';
import { mockUserFindById, restoreUserFindById } from '../utils/passUserAuth';
import { Messages } from '../../utils';

chai.use(chaiHttp);
const { expect } = chai;
const ENDPOINT = '/stories';

describe('Endpoint POST /stories', () => {
  const validToken = jwtUser.sign(userPublicMock);
  const request = CreateChaiRequest.postWithToken(ENDPOINT, validToken);

  let mockedRepositoryFindByTitle: sinon.SinonStub<[title: string], Promise<IStory[] | null>>;
  let mockedRepositoryCreate: sinon.SinonStub<[story: IStoryDTO], Promise<IStory>>;

  before(() => {
    mockedRepositoryFindByTitle = sinon.stub(storyCreateService.repository, 'findByTitle');
    mockedRepositoryCreate = sinon.stub(storyCreateService.repository, 'create');

    mockUserFindById();
  });

  after(() => {
    mockedRepositoryFindByTitle.restore();
    mockedRepositoryCreate.restore();

    restoreUserFindById();
  });

  describe('On success', () => {
    before(() => {
      mockedRepositoryFindByTitle.resolves(null);
    });

    after(() => {
      mockedRepositoryFindByTitle.reset();
      mockedRepositoryCreate.reset();
    });

    it('should return status 201 and the story created', async () => {
      mockedRepositoryCreate.resolves(storyMock);
      const response = await request(storyDTOMock);

      expect(response.status).to.be.equal(StatusCodes.CREATED);
      expect(response.body).to.be.deep.equal(storyMock);
    });

    it('should return status 201 and the story created if description and picture are not provided', async () => {
      mockedRepositoryCreate.resolves(storyMockOnlyRequiredFields);
      const response = await request({ title: storyDTOMock.title });

      expect(response.status).to.be.equal(StatusCodes.CREATED);

      expect(response.body.title).to.be.equal(storyDTOMock.title);
      expect(response.body.description).to.be.equal(null);
      expect(response.body.picture).to.be.equal(null);

      expect(response.body).to.be.deep.equal(storyMockOnlyRequiredFields);
    });
  });

  describe('On failure', () => {
    before(() => {
      mockedRepositoryFindByTitle.resolves([storyMock]);
      mockedRepositoryCreate.resolves(storyMock); // This is not used
    });

    after(() => {
      mockedRepositoryFindByTitle.reset();
      mockedRepositoryCreate.reset();
    });

    it(`should return status 409 and message: "${Messages.STORY_WITH_SAME_TITLE}" if the author already has a story with the same title`, async () => {
      const response = await request(storyDTOMock);

      expect(response.status).to.be.equal(StatusCodes.CONFLICT);
      expect(response.body).to.have.property('message', Messages.STORY_WITH_SAME_TITLE);
    });

    validateStoryFields(ENDPOINT, validToken);
  });
});
