// estilos.service.ts

import { Injectable } from '@nestjs/common';
import { EstiloDTO } from './estilo.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class EstilosService {
  constructor(private prisma: PrismaService) {}

  async create(data: EstiloDTO) {
    return this.prisma.estilo.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.estilo.findMany();
  }

  async update(id: string, data: EstiloDTO) {
    return this.prisma.estilo.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.estilo.delete({
      where: { id },
    });
  }
}
