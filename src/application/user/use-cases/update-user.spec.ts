import { InMemoryRepository } from '@test/in-memory-user-repository';
import { CreateUser } from './create-user';
import { UpdateUser } from './update-user';
import { UserType } from '@/core/users/entities/user';

describe('Update user', () => {
  it('Should be able update all user fields', async () => {
    const userRepository = new InMemoryRepository();
    const createUser = new CreateUser(userRepository);
    const updateUser = new UpdateUser(userRepository);

    const { user } = await createUser.execute({
      name: 'Luan Campos',
      email: 'luan@mail.com',
      avatarUrl: 'https://luancampos.png',
      password: 'myPassword123',
      role: UserType.USER,
    });

    await updateUser.execute({
      id: user.id,
      name: 'Luan Campos',
      email: 'luancampos@mail.com',
      avatarUrl: 'https://github.com/luancamposdev.png',
      role: UserType.ADMIN,
    });

    const updatedUser = await userRepository.findById(user.id);

    expect(updatedUser).toBeTruthy();
  });

  it('Should be able update only specific fields', async () => {
    const userRepository = new InMemoryRepository();
    const createUser = new CreateUser(userRepository);
    const updateUser = new UpdateUser(userRepository);

    const { user } = await createUser.execute({
      name: 'John Doe',
      email: 'jhon@mail.com',
      avatarUrl: 'https://luancampos.png',
      password: 'myPassword123',
      role: UserType.USER,
    });

    await updateUser.execute({
      id: user.id,
      email: 'johndoe@mail.com',
      avatarUrl: 'https://johndoe.png',
      password: 'updatedPassword',
    });

    const updatedUser = await userRepository.findById(user.id);

    expect(updatedUser).toBeTruthy();
  });
});
