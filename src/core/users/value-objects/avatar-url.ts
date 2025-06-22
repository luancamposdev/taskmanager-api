export class AvatarUrl {
  private readonly url: string;

  public get value(): string {
    return this.url;
  }

  public toString(): string {
    return this.url;
  }

  constructor(url: string) {
    if (!url.startsWith('http')) {
      throw new Error('Invalid avatar URL');
    }
    this.url = url;
  }
}
