import { InMemoryRepository } from '@test/in-memory-user-repository';
import { JwtService } from '../ports/jwt.service';
import { CreateUser } from './create-user';
import { AuthenticateWithCredentials } from './authenticate-with-credentials';
import { UserType } from '@/core/users/entities/user';

class FakeJwtService implements JwtService {
  async sign(): Promise<string> {
    await Promise.resolve();
    return 'fake-jwt-token';
  }

  async verify(): Promise<Record<string, unknown> | null> {
    await Promise.resolve();
    return null;
  }
}

describe('AuthenticateWithCredentials', () => {
  it('Should authenticate a user with correct credentials', async () => {
    const userRepository = new InMemoryRepository();
    const jwtService = new FakeJwtService();
    const createUser = new CreateUser(userRepository);
    const authenticate = new AuthenticateWithCredentials(
      userRepository,
      jwtService,
    );

    const userData = {
      name: 'Luan Campos',
      email: 'luancampos@mail.com',
      avatarUrl: 'https://github.com/luancamposdev.png',
      password: 'myPassword123',
      role: UserType.ADMIN,
    };

    await createUser.execute(userData);

    const response = await authenticate.execute({
      email: userData.email,
      password: userData.password,
    });

    expect(response).toBeTruthy();
  });

  it('Should throw error if email is invalid', async () => {
    const userRepository = new InMemoryRepository();
    const jwtService = new FakeJwtService();
    const authenticate = new AuthenticateWithCredentials(
      userRepository,
      jwtService,
    );

    await expect(
      authenticate.execute({
        email: 'noneexistent@mail.com',
        password: 'anyPassword',
      }),
    ).rejects.toThrow('Invalid Credentials');
  });

  it('Should throw error if password is incorrect', async () => {
    const userRepository = new InMemoryRepository();
    const jwtService = new FakeJwtService();
    const createUser = new CreateUser(userRepository);
    const authenticate = new AuthenticateWithCredentials(
      userRepository,
      jwtService,
    );

    const userData = {
      name: 'Luan Campos',
      email: 'luan@mail.com',
      avatarUrl: 'https://luan.png',
      password: 'correctPassword',
      role: UserType.USER,
    };

    await createUser.execute(userData);

    await expect(
      authenticate.execute({
        email: userData.email,
        password: '123456',
      }),
    ).rejects.toThrow('Invalid Credentials');
  });
});
