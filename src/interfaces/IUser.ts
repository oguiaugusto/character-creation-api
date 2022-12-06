import { JwtPayload } from 'jsonwebtoken';

export interface IUserDTO {
  username: string;
  password: string;
}

export interface IUser extends IUserDTO {
  id: string;
}

export interface IUserPublic {
  id: string;
  username: string;
}

export interface IUserDecoded extends JwtPayload {
  data: IUserPublic
}

export interface IUserLogged {
  user: IUserPublic;
  token: string;
}
