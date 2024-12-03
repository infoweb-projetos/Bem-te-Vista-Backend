import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { PostagemDTO, ComentarioDTO } from './postagem.dto';

@Injectable()
export class PostagensService {
  constructor(private prisma: PrismaService) {}

  async createPost(userId: string, data: PostagemDTO) {
    try {
      return await this.prisma.postagem.create({
        data: {
          conteudo: data.conteudo, // Corrigido para usar o valor real
          foto: data.foto, // Pode ser undefined ou uma string
          autor: {
            connect: { id: userId },
          },
        },
      });
    } catch (error) {
      console.error('Error creating post:', error);
      throw new InternalServerErrorException('Could not create post');
    }
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
    return this.prisma.$transaction(async (prisma) => {
      // Exclui os comentários associados à postagem
      await prisma.comentario.deleteMany({
        where: { postagemId: id },
      });
  
      // Exclui a postagem
      return prisma.postagem.delete({
        where: { id },
      });
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

  //async toggleLike(postId: string, userId: string) {
    //const existingLike = await this.prisma.like.findUnique({
     // where: { postId_userId: { postId, userId } },
    //});
  
   // if (existingLike) {
      // Remove o like
   //   await this.prisma.like.delete({
  //      where: { id: existingLike.id },
  //    });
  //    return { liked: false };
  //  } else {
      // Adiciona o like
  //    await this.prisma.like.create({
  //      data: { postId, userId },
  //    });
  //    return { liked: true };
   // }
 // }
  
}
