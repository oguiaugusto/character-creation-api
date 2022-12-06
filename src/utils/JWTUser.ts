import 'dotenv/config';
import { SignOptions, sign, verify } from 'jsonwebtoken';
import { IEncoder } from '../interfaces/IEncoder';
import { IUserDecoded, IUserPublic } from '../interfaces/IUser';

class JWTUser implements IEncoder {
  constructor(
    private secret: string,
    private options: SignOptions,
  ) {
    this.secret = secret;
    this.options = options;
  }

  public sign(user: IUserPublic) {
    return sign({ data: user }, this.secret, this.options);
  }

  public verify(userToken: string) {
    return verify(userToken, this.secret) as IUserDecoded;
  }
}

const { JWT_SECRET = '123456' } = process.env;
const jwtUser = new JWTUser(JWT_SECRET, { expiresIn: '7d' });

export { JWTUser };
export default jwtUser;
