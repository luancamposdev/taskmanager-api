import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';

import { JwtAuthGuard } from '@/infra/user/guards/jwt-auth.guard';
import {
  AuthenticateWithCredentials,
  Response as AuthenticateResponse,
} from '@application/user/use-cases/authenticate-with-credentials';

@Controller('user')
export class UserController {
  constructor(
    private readonly authWithCredentials: AuthenticateWithCredentials,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req: ExpressRequest) {
    return req.user;
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
  ): Promise<AuthenticateResponse> {
    {
      return this.authWithCredentials.execute(body);
    }
  }
}
