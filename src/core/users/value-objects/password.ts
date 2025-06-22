export class Password {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(value: string): Password {
    if (!value) {
      throw new Error('Password must be a string');
    }

    if (value.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
    return new Password(value);
  }

  public getValue(): string {
    return this.value;
  }

  public toString(): string {
    return '[Password]';
  }
}
