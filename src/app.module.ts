// app.module.ts

import { Module } from '@nestjs/common';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { PostagensModule } from './modules/postagens/postagens.module';
import { EstiloModule } from './modules/estilos/estilo.module'; // Ajuste o caminho conforme sua estrutura de diretórios
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    ConfigModule.forRoot(),
    UsuariosModule,
    AuthModule,
    EstiloModule, // Importa o módulo de estilos
    PostagensModule,
  ],
  controllers: [],
  providers: [
  //  {
      //provide: APP_GUARD,
     // useClass: JwtAuthGuard,
    //}
  ],
})
export class AppModule {}
