import { InMemoryRepository } from '@test/in-memory-user-repository';
import { UserType } from '@/core/users/entities/user';

import { CreateUser } from './create-user';
import { DeleteUser } from './delete-user';

describe('Delete user', () => {
  it('Should be able to delete user', async () => {
    const userRepository = new InMemoryRepository();
    const createUser = new CreateUser(userRepository);
    const deleteUser = new DeleteUser(userRepository);

    const { user } = await createUser.execute({
      name: 'Luan Campos',
      email: 'luancampos@mail.com',
      avatarUrl: 'https://luancampos.png',
      password: 'myPassword123',
      role: UserType.ADMIN,
    });

    await deleteUser.execute({ id: user.id });

    const deletedUser = await userRepository.findById(user.id);

    expect(deletedUser).toBeTruthy();
  });

  it('Should be able throw an error if user does not exist', async () => {
    const userRepository = new InMemoryRepository();
    const deleteUser = new DeleteUser(userRepository);

    await expect(() =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      deleteUser.execute({ id: 'non-existent-user' as any }),
    ).rejects.toThrow('User not found with this id');
  });
});
