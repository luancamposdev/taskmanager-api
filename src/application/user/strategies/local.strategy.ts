import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { UserRepository } from '@/core/users/repositories/user-repository';
import { Email } from '@/core/users/value-objects/email.vo';
import { Password } from '@/core/users/value-objects/password';
import { UnauthorizedException } from '@nestjs/common';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({ usernameField: 'email' });
  }
  async validate(email: string, password: string) {
    const emailVO = Email.create(email);
    const user = await this.userRepository.findByEmail(emailVO);

    if (!user) throw new UnauthorizedException('Invalid Credentials');

    const passwordVO = Password.create(password);
    const isValid = await user.passwordHash.compare(passwordVO);

    if (!isValid) throw new UnauthorizedException('Invalid Credentials');

    return user;
  }
}
