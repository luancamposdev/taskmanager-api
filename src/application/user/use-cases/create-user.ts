import { randomUUID } from 'node:crypto';

import { User, UserType } from 'src/core/users/entities/user';
import { UserRepository } from 'src/core/users/repositories/user-repository';
import { AvatarUrl } from 'src/core/users/value-objects/avatar-url';
import { Email } from 'src/core/users/value-objects/email.vo';

import { FullName } from 'src/core/users/value-objects/fullName';
import { Password } from 'src/core/users/value-objects/password';
import { PasswordHash } from 'src/core/users/value-objects/PasswordHash';

interface CreateUserRequest {
  name: string;
  email: string;
  avatarUrl: string;
  password: string;
  role?: UserType;
}

interface CreateUserResponse {
  user: User;
}

export class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { name, email, avatarUrl, password, role } = request;

    const fullName = FullName.create(name);
    const emailVO = Email.create(email);
    const avatar = AvatarUrl.create(avatarUrl);
    const passwordVO = Password.create(password);
    const passwordHash = await PasswordHash.fromPassword(passwordVO);

    const user = new User(randomUUID(), {
      name: fullName,
      email: emailVO,
      avatarUrl: avatar,
      password: passwordVO,
      passwordHash,
      role: role ?? UserType.USER,
    });

    await this.userRepository.create(user);

    return {
      user,
    };
  }
}
