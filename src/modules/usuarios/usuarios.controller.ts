import { Body, Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuarioDTO } from './usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  async create(@Body() data: UsuarioDTO){
    return this.usuariosService.create(data);
  }

  @Get()
  async findAll(){
    return this.usuariosService.findAll();
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() data: UsuarioDTO){
    return this.usuariosService.update(id, data);
  }

  @Delete(":id")
  async delete(@Param('id') id: string){
    return this.usuariosService.delete(id);
  }
}