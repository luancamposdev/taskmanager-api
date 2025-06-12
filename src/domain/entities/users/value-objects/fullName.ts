export class FullName {
  private readonly _fullName: string;

  get value(): string {
    return this._fullName;
  }

  static create(name: string): FullName {
    if (!FullName.isValid(name)) {
      throw new Error('Invalid name. please enter valid name.');
    }

    return new FullName(name.trim());
  }

  public getValue(): string {
    return this._fullName;
  }

  private static isValid(name: string): boolean {
    if (!name) return false;

    const trimmed: string = name.trim();
    const parts = trimmed.split(/\s+/);

    if (parts.length < 2) return false;

    return parts.every((part) => /^[A-Za-zÀ-ÿ]{2,}$/.test(part));
  }

  constructor(fullName: string) {
    this._fullName = fullName;
  }
}
