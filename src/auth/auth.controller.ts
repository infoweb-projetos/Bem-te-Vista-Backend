import { Controller, Body, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
//import { LocalAuthGuard } from './local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

  @Get('protected')
  @UseGuards(JwtAuthGuard)
  getProtectedResource() {
    return 'This is a protected resource';
  }
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
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
