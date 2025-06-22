import { UUID, randomUUID } from 'node:crypto';

import { Replace } from '../../../helpers/replace';
import { FullName } from '../value-objects/fullName';
import { Email } from '../value-objects/email.vo';
import { Password } from '../value-objects/password';
import { passwordHash } from '../value-objects/PasswordHash';
import { AvatarUrl } from '../value-objects/avatar-url';

enum UserType {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface UserProps {
  id: UUID;
  name: FullName;
  email: Email;
  avatarUrl: AvatarUrl;
  password: Password;
  passwordHash: passwordHash;
  role: UserType;
  deletedAccountAt?: Date | null;
  createdAt: Date;
}

export class User {
  private readonly _id: UUID;
  private props: UserProps;

  constructor(id: UUID, props: Replace<UserProps, { createdAt?: Date }>) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): UUID {
    return this._id;
  }

  public set name(name: FullName) {
    this.props.name = name;
  }

  public get name(): FullName {
    return this.props.name;
  }

  public set email(email: Email) {
    this.props.email = email;
  }

  public get email(): Email {
    return this.props.email;
  }

  public set avatarUrl(avatarUrl: AvatarUrl) {
    this.props.avatarUrl = avatarUrl;
  }

  public get avatarUrl(): AvatarUrl {
    return this.props.avatarUrl;
  }

  public set password(password: Password) {
    this.props.password = password;
  }

  public get password(): Password {
    return this.props.password;
  }

  public set passwordHash(passwordHash: passwordHash) {
    this.props.passwordHash = passwordHash;
  }

  public get passwordHash(): passwordHash {
    return this.props.passwordHash;
  }

  public set Role(role: UserType) {
    this.props.role = role;
  }

  public get Role(): UserType {
    return this.props.role;
  }

  public deleteAccount() {
    this.props.deletedAccountAt = new Date();
  }

  public get deleteAccountAt(): Date | null | undefined {
    return this.props.deletedAccountAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
