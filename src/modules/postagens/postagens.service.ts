import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { PostagemDTO, ComentarioDTO } from './postagem.dto';

@Injectable()
export class PostagensService {
  constructor(private prisma: PrismaService) {}

  async createPost(userId: string, data: PostagemDTO) {
    return this.prisma.postagem.create({
      data: {
        ...data,
        autorId: userId, // Define o autor da postagem
      },
    });
  }

  async findAllPosts() {
    return this.prisma.postagem.findMany({
      include: {
        autor: true, // Inclui dados do autor
        comentarios: {
          include: {
            autor: true, // Inclui dados dos autores dos comentários
          },
        },
      },
    });
  }

  async findPostById(id: string) {
    return this.prisma.postagem.findUnique({
      where: { id },
      include: {
        autor: true,
        comentarios: {
          include: {
            autor: true,
          },
        },
      },
    });
  }

  async updatePost(id: string, data: PostagemDTO) {
    return this.prisma.postagem.update({
      where: { id },
      data,
    });
  }

  async deletePost(id: string) {
    return this.prisma.postagem.delete({
      where: { id },
    });
  }

  async createComment(postId: string, userId: string, data: ComentarioDTO) {
    return this.prisma.comentario.create({
      data: {
        ...data,
        postagemId: postId,
        autorId: userId,
      },
    });
  }
}
