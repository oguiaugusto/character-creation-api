export interface IUserDTO {
  username: string;
  password: string;
}

export interface IUser extends IUserDTO {
  id: string;
}
