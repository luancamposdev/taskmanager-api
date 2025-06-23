import { User } from '@/core/users/entities/user';
import { UserRepository } from '@/core/users/repositories/user-repository';
import { Email } from '@/core/users/value-objects/email.vo';

interface Request {
  email: Email;
}

interface Response {
  user: User;
}

export class GetUserByEmail {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: Request): Promise<Response> {
    const { email } = request;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('User not found with this email');
    }

    return { user };
  }
}
