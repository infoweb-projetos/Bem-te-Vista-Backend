import { Module } from '@nestjs/common';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsuariosModule,
    AuthModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
