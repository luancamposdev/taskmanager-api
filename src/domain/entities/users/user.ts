import { UUID, randomUUID } from 'node:crypto';

import { Replace } from '../../../helpers/replace';
import { FullName } from './value-objects/fullName';

enum UserType {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface UserProps {
  id: UUID;
  name: FullName;
  email: string;
  passwordHash: string;
  role: UserType;
  deletedAccountAt?: Date | null;
  createdAt?: Date | null;
}

export class User {
  private _id: UUID;
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
}
