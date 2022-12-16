import chai from 'chai';
import { app } from '../../api/app';

class CreateChaiRequest {
  public static post = (endpoint: string) => async (body: any = {}) => {
    return chai.request(app).post(endpoint).send(body);
  }

  public static postWithToken = (endpoint: string, token: string) => async (body: any = {}) => {
    return chai.request(app).post(endpoint).set('Authorization', token).send(body);
  }

  public static getWithToken = (endpoint: string, token: string) => async (body: any = {}) => {
    return chai.request(app).get(endpoint).set('Authorization', token).send(body);
  }
}

export default CreateChaiRequest;
