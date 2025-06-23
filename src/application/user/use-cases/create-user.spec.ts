import { CreateUser } from './create-user';
import { InMemoryRepository } from '../../../../test/in-memory-user-repository';

describe('CreateUserUseCase', () => {
  it('Should create a user with valid data', async () => {
    const userRepository = new InMemoryRepository();
    const createUser = new CreateUser(userRepository);

    const { user } = await createUser.execute({
      name: 'Luan Campos',
      email: 'luancampos@mail.com',
      avatarUrl: 'https://luancampos.png',
      password: 'myPassword123',
    });

    expect(userRepository.users).toHaveLength(1);
    expect(userRepository.users[0]).toEqual(user);
  });

  it('Should throw an error if email is already in use', async () => {
    const userRepository = new InMemoryRepository();
    const createUser = new CreateUser(userRepository);

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      avatarUrl: 'https://johndoe.png',
      password: 'myPassword123',
    });

    await expect(
      createUser.execute({
        name: 'Luan Campos',
        email: 'johndoe@mail.com',
        avatarUrl: 'https://luancampos.png',
        password: 'password123',
      }),
    ).rejects.toThrow('Email already in use');
  });
});
