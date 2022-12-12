// import MemoryUserRepository from './MemoryUserRepository';
import PrismaUserRepository from './PrismaUserRepository';

// const memoryUserRepository = new MemoryUserRepository();
const userRepository = new PrismaUserRepository();

export {
  // memoryUserRepository,
  userRepository,
};
