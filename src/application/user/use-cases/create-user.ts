import { randomUUID } from 'node:crypto';

import { User, UserType } from '../../../core/users/entities/user';
import { UserRepository } from '../../../core/users/repositories/user-repository';
import { AvatarUrl } from '../../../core/users/value-objects/avatar-url';
import { Email } from '../../../core/users/value-objects/email.vo';

import { FullName } from '../../../core/users/value-objects/fullName';
import { Password } from '../../../core/users/value-objects/password';
import { PasswordHash } from '../../../core/users/value-objects/PasswordHash';

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

    const existingUser = await this.userRepository.findByEmail(
      Email.create(email),
    );
    if (existingUser) {
      throw new Error('Email already in use');
    }

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
