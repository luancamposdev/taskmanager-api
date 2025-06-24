import { UUID } from 'node:crypto';

import { UserRepository } from '@/core/users/repositories/user-repository';
import { FullName } from '@/core/users/value-objects/fullName';
import { Email } from '@/core/users/value-objects/email.vo';
import { AvatarUrl } from '@/core/users/value-objects/avatar-url';
import { UserType } from '@/core/users/entities/user';
import { Password } from '@/core/users/value-objects/password';
import { PasswordHash } from '@/core/users/value-objects/PasswordHash';

interface Request {
  id: UUID;
  name?: string;
  email?: string;
  avatarUrl?: string;
  password?: string;
  role?: UserType;
}

interface Response {
  message: string;
}

export class UpdateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: Request): Promise<Response> {
    const { id, name, email, avatarUrl, password, role } = request;

    const user = await this.userRepository.findById(id);

    if (!user) throw new Error('User not found with this id');

    if (name != null) user.name = FullName.create(name);
    if (email != null) user.email = Email.create(email);
    if (avatarUrl != null) user.avatarUrl = AvatarUrl.create(avatarUrl);
    if (password != null) {
      const passwordValue = Password.create(password);
      user.password = passwordValue;
      user.passwordHash = await PasswordHash.fromPassword(passwordValue);
    }
    if (role != null) user.role = role;

    await this.userRepository.save(user);

    return { message: 'User successfully updated' };
  }
}
