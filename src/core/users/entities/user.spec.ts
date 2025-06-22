import { randomUUID } from 'node:crypto';

import { User, UserType } from './user';
import { FullName } from '../value-objects/fullName';
import { Email } from '../value-objects/email.vo';
import { AvatarUrl } from '../value-objects/avatar-url';
import { Password } from '../value-objects/password';
import { PasswordHash } from '../value-objects/PasswordHash';

describe('User Entity', () => {
  it('Should be able to create a user with all required properties', async () => {
    const password = Password.create('MyPassword123');
    const hash = await PasswordHash.fromPassword(password);

    const user = new User(randomUUID(), {
      name: FullName.create('Luan Campos'),
      email: Email.create('luancampos@mail.com'),
      avatarUrl: AvatarUrl.create('https://github.com/luancamposdev.png'),
      password: password,
      passwordHash: hash,
      role: UserType.USER,
    });

    expect(user).toBeTruthy();
    expect(user.name.getValue()).toBe('Luan Campos');
    expect(user.email.getValue()).toBe('luancampos@mail.com');
    expect(user.avatarUrl.getValue()).toBe(
      'https://github.com/luancamposdev.png',
    );
    expect(user.password.getValue()).toBe('MyPassword123');
    expect(await user.passwordHash.compare(password)).toBe(true);
    expect(user.role).toBe(UserType.USER);
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.deleteAccountAt).toBeUndefined();
  });

  it('should allow updating the avatar URL', async () => {
    const password = Password.create('UpdateAvatar123');
    const hash = await PasswordHash.fromPassword(password);

    const user = new User(randomUUID(), {
      name: FullName.create('Luan Campos'),
      email: Email.create('luancampos@mail.com'),
      avatarUrl: AvatarUrl.create('https://github.com/luancamposdev.png'),
      password: password,
      passwordHash: hash,
      role: UserType.USER,
    });

    const newAvatar = AvatarUrl.create(
      'https://cdn.example.com/luancampos.png',
    );
    user.avatarUrl = newAvatar;

    expect(user.avatarUrl.getValue()).toBe(
      'https://cdn.example.com/luancampos.png',
    );
  });
});
