import chai from 'chai';
import { app } from '../../api/app';

const createChaiRequest = (endpoint: string) => async (body: any = {}) => (
  chai.request(app).post(endpoint).send(body)
);

export default createChaiRequest;
