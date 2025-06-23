import { InMemoryRepository } from '@test/in-memory-user-repository';
import { UserType } from '@/core/users/entities/user';
import { Email } from '@/core/users/value-objects/email.vo';

import { CreateUser } from './create-user';
import { GetUserByEmail } from './get-user-by-email';

describe('GetUserById', () => {
  it('Should be able return user when a valid email is provided', async () => {
    const userRepository = new InMemoryRepository();
    const createUser = new CreateUser(userRepository);
    const getUserByEmail = new GetUserByEmail(userRepository);

    const { user } = await createUser.execute({
      name: 'Luan Campos',
      email: 'luancampos@mail.com',
      avatarUrl: 'https://luancampos.png',
      password: 'myPassword123',
      role: UserType.USER,
    });

    const result = await getUserByEmail.execute({
      email: Email.create('luancampos@mail.com'),
    });

    expect(result.user).toEqual(user);
  });

  it('Should throw if user with given email does not exist', async () => {
    const userRepository = new InMemoryRepository();
    const getUserByEmail = new GetUserByEmail(userRepository);

    await expect(() =>
      getUserByEmail.execute({ email: Email.create('notfound@mail.com') }),
    ).rejects.toThrow('User not found with this email');
  });
});
