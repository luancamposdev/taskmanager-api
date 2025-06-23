import { User } from '../entities/user';
import { Email } from '../value-objects/email.vo';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract findByEmail(email: Email): Promise<User | null>;
}
