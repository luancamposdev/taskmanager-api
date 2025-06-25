import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

import { JwtService } from '@/application/user/ports/jwt.service';

@Injectable()
export class JwtTokenService implements JwtService {
  constructor(private readonly jwt: NestJwtService) {}

  async sign(payload: Record<string, unknown>): Promise<string> {
    return this.jwt.signAsync(payload);
  }

  async verify(token: string): Promise<Record<string, unknown> | null> {
    try {
      const raw: unknown = await this.jwt.verifyAsync(token);

      if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
        return raw as Record<string, unknown>;
      }

      return null;
    } catch {
      return null;
    }
  }
}
