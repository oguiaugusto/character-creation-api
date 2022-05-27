export interface IUser {
  id: string;
  username: string;
  password: string;
  picture: string | null;
  admin: boolean;
}

export interface IUserDTO {
  username: string;
  password: string;
  picture: string | null;
}

export interface IUserDTOWithId extends IUserDTO {
  id: string;
}
