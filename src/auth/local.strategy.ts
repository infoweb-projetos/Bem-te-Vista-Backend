import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({usernameField: 'email'});
  }

  async validate(email: string, senha: string): Promise<any> {
    console.log('Validating user:', email);
    const user = await this.authService.validateUser(email, senha);
    console.log('User validation result:', user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
