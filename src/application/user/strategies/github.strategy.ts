import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github2';

interface GitHubUserPayload {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  provider: 'github';
}

@Injectable()
export class GitHubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      callbackURL: process.env.GITHUB_CALLBACK_URL as string,
      scope: ['user:email'],
    });
  }

  validate(
    accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ): GitHubUserPayload {
    const name = profile.displayName ?? profile.username;
    const email = profile.emails?.[0]?.value ?? '';
    const avatarUrl = profile.photos?.[0]?.value ?? '';

    return {
      id: profile.id ?? '',
      name,
      email,
      avatarUrl,
      provider: 'github',
    };
  }
}
