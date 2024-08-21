import { Controller, Body, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() login: login) {
    return this.authService.login(login);
  }

  @Get('status')
  status(@Request() req) {
    if (req.isAuthenticated()) {
      return req.user;
    }
    return { message: 'Not authenticated' };
  }

  @Post('logout')
  logout(@Request() req) {
    req.logout(() => {
      return { message: 'Logged out' };
    });
  }
}
