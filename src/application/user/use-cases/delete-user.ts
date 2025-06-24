import { UUID } from 'node:crypto';

import { UserRepository } from '@/core/users/repositories/user-repository';

interface Request {
  id: UUID;
}

interface Response {
  message: string;
}

export class DeleteUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: Request): Promise<Response> {
    const { id } = request;

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('User not found with this id');
    }

    user.deleteAccount();

    await this.userRepository.save(user);

    return { message: 'User successfully deleted' };
  }
}
