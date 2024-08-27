// app.module.ts

import { Module } from '@nestjs/common';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { EstiloModule } from './modules/estilos/estilo.module'; // Ajuste o caminho conforme sua estrutura de diretórios

@Module({
  imports: [
    UsuariosModule,
    AuthModule,
    EstiloModule, // Importa o módulo de estilos
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
