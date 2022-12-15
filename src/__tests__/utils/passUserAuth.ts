import sinon from 'sinon';
import { IUser } from '../../interfaces/IUser';
import userAuth from '../../middlewares/userAuth';
import { userMock } from '../mocks/userMock';

let userAuthMockedRepositoryFindById: sinon.SinonStub<[id: string], Promise<IUser | null>>;

const mockUserFindById = () => {
  userAuthMockedRepositoryFindById = sinon.stub(userAuth.repository, 'findById');
  userAuthMockedRepositoryFindById.resolves(userMock);
};

const restoreUserFindById = () => {
  userAuthMockedRepositoryFindById.restore();
};

export { mockUserFindById, restoreUserFindById };
