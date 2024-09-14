import { Controller, Post, Get, Put, Delete, Param, Body, Request } from '@nestjs/common';
import { PostagensService } from './postagens.service';
import { PostagemDTO, ComentarioDTO } from './postagem.dto';

@Controller('postagens')
export class PostagensController {
  constructor(private readonly postagensService: PostagensService) {}

  @Post()
  async createPost(@Request() req, @Body() data: PostagemDTO) {
    return this.postagensService.createPost(req.user.userId, data);
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
  async deletePost(@Param('id') id: string) {
    return this.postagensService.deletePost(id);
  }

  @Post(':id/comentarios')
  async createComment(@Param('id') postId: string, @Request() req, @Body() data: ComentarioDTO) {
    return this.postagensService.createComment(postId, req.user.userId, data);
  }
}
