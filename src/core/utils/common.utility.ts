import { randomBytes, pbkdf2Sync } from 'crypto';

export class CommonUtilitiy {
  public static encryptBySalt(
    password: string,
    salt = randomBytes(16).toString('hex'),
  ): Record<string, string> {
    const hash = pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString(
      'hex',
    );
    return {
      hash,
      salt,
    };
  }
}
