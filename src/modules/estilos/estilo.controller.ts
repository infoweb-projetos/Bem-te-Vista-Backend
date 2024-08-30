// estilos.controller.ts

import { Body, Controller, Post, Get, Put, Delete, Param } from '@nestjs/common';
import { EstilosService } from './estilo.service';
import { EstiloDTO, UpdateStylesDto } from './estilo.dto';
import { UsuariosService } from '../usuarios/usuarios.service';

@Controller('estilos')
export class EstilosController {
  UsuariosService: any;
  constructor(private readonly estilosService: EstilosService) {}

  @Post()
  async create(@Body() data: EstiloDTO) {
    return this.estilosService.create(data);
  }

  @Get()
  async findAll() {
    return this.estilosService.findAll();
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() data: EstiloDTO) {
    return this.estilosService.update(id, data);
  }

  @Delete(":id")
  async delete(@Param('id') id: string) {
    return this.estilosService.delete(id);
  }
  @Post('users/:id/styles')
async updateStyles(@Param('id') userId: string, @Body() updateStylesDto: UpdateStylesDto) {
    return this.UsuariosService.updateStyles(userId, updateStylesDto.styles);
}
}
