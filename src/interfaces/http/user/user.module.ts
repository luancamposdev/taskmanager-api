import { Module } from '@nestjs/common';

import { JwtStrategy } from '@/application/user/strategies/jwt.strategy';
import { JwtAuthGuard } from '@/infra/user/guards/jwt-auth.guard';

@Module({
  providers: [JwtStrategy, JwtAuthGuard],
})
export class UserModule {}
