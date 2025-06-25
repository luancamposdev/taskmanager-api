import { JwtService } from '../ports/jwt.service';

import { UserRepository } from '@/core/users/repositories/user-repository';
import { Email } from '@/core/users/value-objects/email.vo';
import { Password } from '@/core/users/value-objects/password';

export interface Request {
  email: string;
  password: string;
}

export interface Response {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    role: string;
  };
}

export class AuthenticateWithCredentials {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute({ email, password }: Request): Promise<Response> {
    const emailVO = Email.create(email);
    const user = await this.userRepository.findByEmail(emailVO);

    if (!user) throw new Error('Invalid Credentials');

    const passwordVO = Password.create(password);
    const isValid = await user.passwordHash.compare(passwordVO);

    if (!isValid) throw new Error('Invalid Credentials');

    const token = await this.jwtService.sign({
      sub: user.id,
      role: user.role,
      email: user.email.getValue(),
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name.getValue(),
        email: user.email.getValue(),
        avatarUrl: user.avatarUrl.getValue(),
        role: user.role,
      },
    };
  }
}
