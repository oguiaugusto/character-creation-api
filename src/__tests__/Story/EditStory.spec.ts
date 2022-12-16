import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import CreateChaiRequest from '../utils/CreateChaiRequest';
import jwtUser from '../../utils/JWTUser';
import { StatusCodes } from 'http-status-codes';
import { anotherUserMock, userPublicMock } from '../mocks/userMock';
import { IStory, IStoryDTO } from '../../interfaces/IStory';
import { storyEditService } from '../../modules/Story/Edit';
import { storyEditedDTOMock, storyEditedMock, storyMock } from '../mocks/storyMock';
import { mockUserFindById, restoreUserFindById } from '../utils/passUserAuth';
import { Messages } from '../../utils';

chai.use(chaiHttp);
const { expect } = chai;
const ENDPOINT = (id: string) => `/stories/:${id}`;

describe('Endpoint PATCH /stories/:id', () => {
  const validToken = jwtUser.sign(userPublicMock);
  const anotherUserValidToken = jwtUser.sign(anotherUserMock);
  const request = (id: string, body: any = {}) => CreateChaiRequest.patchWithToken(ENDPOINT(id), validToken)(body);
  const requestWithAnotherUserToken = (id: string, body: any = {}) => CreateChaiRequest.patchWithToken(ENDPOINT(id), anotherUserValidToken)(body);

  let mockedRepositoryFindById: sinon.SinonStub<[id: string], Promise<IStory | null>>;
  let mockedRepositoryFindByTitle: sinon.SinonStub<[title: string], Promise<IStory[]>>
  let mockedRepositoryEditFields: sinon.SinonStub<[id: string, fields: Partial<IStoryDTO>], Promise<IStory>>;

  before(() => {
    mockedRepositoryFindById = sinon.stub(storyEditService.repository, 'findById');
    mockedRepositoryFindByTitle = sinon.stub(storyEditService.repository, 'findByTitle');
    mockedRepositoryEditFields = sinon.stub(storyEditService.repository, 'editFields');

    mockUserFindById();
  });

  after(() => {
    mockedRepositoryFindById.restore();
    mockedRepositoryEditFields.restore();

    restoreUserFindById();
  });

  describe('On success', () => {
    before(() => {
      mockedRepositoryFindById.resolves(storyMock);
      mockedRepositoryFindByTitle.resolves([]);
      mockedRepositoryEditFields.resolves(storyEditedMock);
    });

    after(() => {
      mockedRepositoryFindById.reset();
      mockedRepositoryEditFields.reset();
    });

    it('should return status 200 and the edited story', async () => {
      const response = await request(storyMock.id, storyEditedDTOMock);

      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body).to.be.eql(storyEditedMock);
    });

    it('should be possible to pass the validations without providing any of the fields', async () => {
      const response1 = await request(storyMock.id, { title: storyEditedDTOMock.title });
      const response2 = await request(storyMock.id, { description: storyEditedDTOMock.description });
      const response3 = await request(storyMock.id, { picture: storyEditedDTOMock.picture });

      expect(response1.status).to.be.equal(StatusCodes.OK);
      expect(response2.status).to.be.equal(StatusCodes.OK);
      expect(response3.status).to.be.equal(StatusCodes.OK);

      expect(response1.body).not.to.have.property('message');
      expect(response2.body).not.to.have.property('message');
      expect(response3.body).not.to.have.property('message');

      expect(response1.body).to.be.eql(storyEditedMock);
      expect(response2.body).to.be.eql(storyEditedMock);
      expect(response3.body).to.be.eql(storyEditedMock);
    });
  });

  describe('On failure', () => {
    before(() => {
      mockedRepositoryFindById.onFirstCall().resolves(null);
      mockedRepositoryFindById.onSecondCall().resolves(storyMock);
      mockedRepositoryFindById.onThirdCall().resolves(storyMock);

      mockedRepositoryFindByTitle.resolves([{ ...storyMock, title: storyEditedMock.title }]);
      mockedRepositoryEditFields.resolves(storyEditedMock); // This is not used
    });

    after(() => {
      mockedRepositoryFindById.reset();
      mockedRepositoryFindByTitle.reset();
      mockedRepositoryEditFields.reset();
    });

    it(`should return status 404 and message: "${Messages.STORY_NOT_FOUND}" if so`, async () => {
      const response = await request('invalid-id', storyEditedDTOMock);

      expect(response.status).to.be.equal(StatusCodes.NOT_FOUND);
      expect(response.body).to.have.property('message', Messages.STORY_NOT_FOUND);
    });

    it(`should return status 403 and message: "${Messages.YOU_DONT_HAVE_PERMISSION}" if the user is not the owner of the story`, async () => {
      const response = await requestWithAnotherUserToken(storyMock.id, storyEditedDTOMock);

      expect(response.status).to.be.equal(StatusCodes.FORBIDDEN);
      expect(response.body).to.have.property('message', Messages.YOU_DONT_HAVE_PERMISSION);
    });

    it(`should return status 409 and message: ${Messages.STORY_WITH_SAME_TITLE} if so`, async () => {
      const response = await request(storyMock.id, storyEditedDTOMock);

      expect(response.status).to.be.equal(StatusCodes.CONFLICT);
      expect(response.body).to.have.property('message', Messages.STORY_WITH_SAME_TITLE);
    });
  });
});
