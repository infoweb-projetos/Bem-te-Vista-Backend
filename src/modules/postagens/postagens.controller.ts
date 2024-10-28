import { Controller, Post, Get, Put, Delete, ForbiddenException, Param, Body, Request, UseGuards, UseInterceptors, UploadedFile, InternalServerErrorException } from '@nestjs/common';
import { PostagensService } from './postagens.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostagemDTO, ComentarioDTO } from './postagem.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

@Controller('postagens')
export class PostagensController {
  constructor(private readonly postagensService: PostagensService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('foto', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const filename = `${uuidv4()}${path.extname(file.originalname)}`;
        callback(null, filename);
      },
    }),
    fileFilter: (req, file, callback) => {
      console.log('Request user:', req.user); // Verifique se req.user está sendo definido
      if (file.mimetype.startsWith('image/')) {
        callback(null, true);
      } else {
        callback(new Error('Tipo de arquivo inválido'), false);
      }
    },
  }))
  async createPost(@Request() req, @Body() data: PostagemDTO, @UploadedFile() file: Express.Multer.File) {
    try {
      console.log('Request user:', req.user); // Verifique se req.user está sendo definido
      if (!req.user || !req.user.userId) {
        throw new InternalServerErrorException('Usuário não autenticado');
      }
      const postagemData = {
        ...data,
        foto: file ? file.filename : undefined,
      };
      return await this.postagensService.createPost(req.user.userId, postagemData);
    } catch (error) {
      console.error('Erro ao criar postagem:', error);
      throw new InternalServerErrorException('Erro ao criar postagem');
    }
  }

  @Get()
  async findAllPosts() {
    return this.postagensService.findAllPosts();
  }

  @Get(':id')
  async findPostById(@Param('id') id: string) {
    return this.postagensService.findPostById(id);
  }

  @Put(':id')
  async updatePost(@Param('id') id: string, @Body() data: PostagemDTO) {
    return this.postagensService.updatePost(id, data);
  }

  @Delete(':id')
@UseGuards(JwtAuthGuard)
async deletePost(@Param('id') id: string, @Request() req) {
  const postagem = await this.postagensService.findPostById(id);
  if (!postagem || postagem.autorId !== req.user.userId) {
    throw new ForbiddenException('Você não tem permissão para excluir esta postagem');
  }
  return this.postagensService.deletePost(id);
}

  @Post(':id/comentarios')
  @UseGuards(JwtAuthGuard)
  async createComment(@Param('id') postId: string, @Request() req, @Body() data: ComentarioDTO) {
    console.log('Request user:', req.user); // Verifique se req.user está sendo definido
    if (!req.user || !req.user.userId) {
      throw new InternalServerErrorException('Usuário não autenticado');
    }
    return this.postagensService.createComment(postId, req.user.userId, data);
  }
}
