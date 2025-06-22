import { Password } from './password';
import { passwordHash } from './PasswordHash';

describe('PasswordHash', () => {
  it('Should be able to create a hash from a valid password', async () => {
    const password = Password.create('secretPassword123');
    const hashed = await passwordHash.fromPassword(password);

    expect(hashed).toBeInstanceOf(passwordHash);
    expect(hashed.getValue()).toMatch(/^\$2[aby]?\$/);
  });

  it('Should be able to compare a valid password with its hash', async () => {
    const password = Password.create('secreteTest123');
    const hashed = await passwordHash.fromPassword(password);

    const result = await hashed.compare(password);

    expect(result).toBeTruthy();
  });

  it('Should return false when comparing with incorrect password', async () => {
    const original = Password.create('ValidPassword');
    const hashed = await passwordHash.fromPassword(original);

    const wrong = Password.create('NotValidPassword');
    const result = await hashed.compare(wrong);

    expect(result).toBe(false);
  });

  it('Should be able to create from an existing valid hash', () => {
    const hash = '$2b$10$012345678901234567890u1IDDoTovtGPXrS3IAVRhTwIfhVssVm2';
    const hashed = passwordHash.fromHash(hash);

    expect(hashed).toBeInstanceOf(passwordHash);
    expect(hashed.getValue()).toBe(hash);
  });
});
