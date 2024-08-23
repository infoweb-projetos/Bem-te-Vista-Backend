import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../modules/usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt'; // Importa bcrypt para comparar senhas
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsuariosService, // Injeta o serviço de usuários
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, senha: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    console.log('User found:', user);
    if (user) {
        const passwordMatch = await bcrypt.compare(senha, user.senha);
        console.log('Password match:', passwordMatch);
        if (passwordMatch) {
            const { senha, ...result } = user;
            return result;
        } else {
            console.log('Password did not match');
        }
    } else {
        console.log('No user found with that email');
    }
    return null;
  }
  

  async login(loginDto: LoginDto) {
    const { email, senha } = loginDto;

    // Busca o usuário pelo email
    const user = await this.usersService.findByEmail(email);

    // Verifica se o usuário existe e a senha está correta
    if (!user || !(await this.verifyPassword(senha, user.senha))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Cria o payload para o token JWT
    const payload = { email: user.email, sub: user.id };

    // Gera o token JWT
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Função para verificar se a senha informada é a mesma do usuário
  private async verifyPassword(inputPassword: string, storedPassword: string): Promise<boolean> {
    return bcrypt.compare(inputPassword, storedPassword);
  }
}


