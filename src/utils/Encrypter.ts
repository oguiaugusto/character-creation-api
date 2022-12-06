import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

class Encrypter {
  public static encrypt = async (value: string) => {
    const encryptedValue = await bcrypt.hash(value, SALT_ROUNDS);
    return encryptedValue;
  };

  public static decrypt = async (value: string, hash: string) => {
    const isMatch = await bcrypt.compare(value, hash);
    return isMatch;
  };
}

export default Encrypter;
