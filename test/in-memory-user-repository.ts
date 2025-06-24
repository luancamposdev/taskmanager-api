/* eslint-disable @typescript-eslint/require-await */
import { UUID } from 'crypto';
import { User } from '../src/core/users/entities/user';
import { UserRepository } from '../src/core/users/repositories/user-repository';
import { Email } from '../src/core/users/value-objects/email.vo';

export class InMemoryRepository implements UserRepository {
  public users: User[] = [];

  async findByEmail(email: Email): Promise<User | null> {
    const user = this.users.find(
      (user) => user.email.getValue() === email.getValue(),
    );
    return user ?? null;
  }

  async findById(id: UUID): Promise<User | null> {
    const user = this.users.find((u) => u.id === id);

    return user ?? null;
  }

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async save(user: User): Promise<void> {
    const index = this.users.findIndex((u) => u.id === user.id);
    if (index >= 0) {
      this.users[index] = user;
    }
  }
}
