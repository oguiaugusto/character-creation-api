import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

class Encrypter {
  public static encrypt = async (value: string) => {
    const encryptedValue = await bcrypt.hash(value, SALT_ROUNDS);
    return encryptedValue;
  };
}

export default Encrypter;
