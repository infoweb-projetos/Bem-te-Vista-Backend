// estilos.controller.ts

import { Body, Controller, Post, Get, Put, Delete, Param } from '@nestjs/common';
import { EstilosService } from './estilo.service';
import { EstiloDTO, UpdateStylesDto } from './estilo.dto';
import { UsuariosService } from '../usuarios/usuarios.service';

@Controller('estilos')
export class EstilosController {
  constructor(
    private readonly estilosService: EstilosService,
    private readonly usuariosService: UsuariosService, // Injeção correta do serviço
  ) {}

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
    console.info(data)
    return this.estilosService.update(id, data);
  }

  @Delete(":id")
  async delete(@Param('id') id: string) {
    return this.estilosService.delete(id);
  }

  @Post('users/:id/styles')
  async updateStyles(
    @Param('id') userId: string, 
    @Body() updateStylesDto: UpdateStylesDto
  ) {
    return this.usuariosService.updateStyles(userId, updateStylesDto.styles); // Correção na chamada do serviço
  }
}
