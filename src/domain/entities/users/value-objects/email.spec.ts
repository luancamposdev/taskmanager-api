import { Email } from './email.vo';

describe('Email', () => {
  it('Should be able to create a valid email', () => {
    const email = Email.create('luancampos@gmail.com');

    expect(email).toBeTruthy();
  });

  it('should be able to remove spaces and convert to lowercase ', () => {
    const email = Email.create('    Luan@Email.COm');

    expect(email.getValue()).toBeTruthy();
  });

  it('Should be able throws error for invalid email', () => {
    expect(() => Email.create('invalid-email')).toThrow('Invalid email');
    expect(() => Email.create('luan@.com')).toThrow('Invalid email');
    expect(() => Email.create('')).toThrow('Invalid email');
    expect(() => Email.create('luan@com')).toThrow('Invalid email');
  });

  it('lança erro para valores nulos ou indefinidos', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    expect(() => Email.create(null as any)).toThrow();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    expect(() => Email.create(undefined as any)).toThrow();
  });
});
