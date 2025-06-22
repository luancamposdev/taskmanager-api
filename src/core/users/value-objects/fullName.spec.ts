import { FullName } from './fullName';

describe('Full Name', () => {
  it('Should be able to create a valid full name with first name and last name ', () => {
    const fullName = FullName.create('Luan Campos');

    expect(fullName).toBeTruthy();
  });

  it('Should be able to remove extra spaces on the edges', () => {
    const fullName = FullName.create('   Luan Campos   ');

    expect(fullName.getValue()).toEqual('Luan Campos');
  });

  it('Should be able to throw a error if name has only one word', () => {
    expect(() => FullName.create('Luan')).toThrow(
      'Invalid name. please enter valid name.',
    );
  });
});
