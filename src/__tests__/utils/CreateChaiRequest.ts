import chai from 'chai';
import { app } from '../../api/app';

class CreateChaiRequest {
  public static post = (endpoint: string) => async (body: any = {}) => {
    return chai.request(app).post(endpoint).send(body);
  }
}

export default CreateChaiRequest;
