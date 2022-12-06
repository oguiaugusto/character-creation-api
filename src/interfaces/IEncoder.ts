import { IUserDecoded, IUserPublic } from './IUser';

export interface IEncoder {
  sign(user: IUserPublic): string;
  verify(userToken: string): IUserDecoded;
}
