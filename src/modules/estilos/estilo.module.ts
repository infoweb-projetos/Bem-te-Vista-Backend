// estilo.module.ts

import { Module } from '@nestjs/common';
import { EstilosController } from './estilo.controller';
import { EstilosService } from './estilo.service';
import { PrismaService } from 'src/database/PrismaService'; // Certifique-se de que o caminho está correto
import { UsuariosModule } from '../usuarios/usuarios.module'; // Importe o módulo que contém UsuariosService

@Module({
  imports: [UsuariosModule], // Adicione o módulo importado
  controllers: [EstilosController],
  providers: [EstilosService, PrismaService],
  exports: [EstilosService] // Se você precisar usar o serviço em outros módulos
})
export class EstiloModule {}
