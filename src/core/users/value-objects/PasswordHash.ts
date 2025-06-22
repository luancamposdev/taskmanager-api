import * as bcrypt from 'bcrypt';
import { Password } from './password';

export class PasswordHash {
  private readonly hash: string;

  private constructor(hash: string) {
    this.hash = hash;
  }

  static async fromPassword(password: Password): Promise<PasswordHash> {
    const saltRounds = 10;
    const hashed = await bcrypt.hash(password.getValue(), saltRounds);
    return new PasswordHash(hashed);
  }

  static fromHash(hash: string): PasswordHash {
    if (!hash.startsWith('$2')) {
      throw new Error('Invalid hash format');
    }

    return new PasswordHash(hash);
  }

  async compare(password: Password): Promise<boolean> {
    return bcrypt.compare(password.getValue(), this.hash);
  }

  public getValue(): string {
    return this.hash;
  }

  public toString(): string {
    return '[PasswordHash]';
  }
}
