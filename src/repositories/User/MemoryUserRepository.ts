import { v4 } from 'uuid';
import { IUser, IUserDTO } from '../../interfaces/IUser';
import { IUserRepository } from './IUserRepository';

class MemoryUserRepository implements IUserRepository {
  private users: IUser[] = [];

  public create = async (user: IUserDTO): Promise<IUser> => {
    const newUser = { id: v4(), ...user };
    this.users.push(newUser);

    return newUser;
  };

  public findByUsername = async (username: string): Promise<IUser | null> => {
    const user = this.users.find((u) => u.username === username);
    if (!user) return null;

    return user;
  };

  public findById = async (id: string): Promise<IUser | null> => {
    const user = this.users.find((u) => u.id === id);
    if (!user) return null;

    return user;
  };
}

export default MemoryUserRepository;
