import { Injectable } from '@nestjs/common';
import { UsuarioDTO } from './usuario.dto';
import { PrismaService } from 'src/database/PrismaService';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {

    constructor(private prisma: PrismaService) {}

    async create(data: UsuarioDTO) {
        const hashedPassword = await bcrypt.hash(data.senha, 10);
    
        const userExists = await this.prisma.user.findFirst({
            where: { email: data.email },
        });
        
        if (userExists) {
            throw new Error('Email já cadastrado');
        }
        
        const user = await this.prisma.user.create({
            data: { ...data, senha: hashedPassword },
        });
    
        return user;
    }
    
    async findAll(){
        return this.prisma.user.findMany();
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
            select: { id: true, email: true, nome_de_usuario: true, senha: true, nome: true },
        });
    }
    
    async update(id: string, data: UsuarioDTO){
        const userExists = await this.prisma.user.findUnique({ where: { id } });

        if(!userExists) {
            throw new Error('Esse usuário não existe');
        }
        return this.prisma.user.update({ data, where: { id } });
    }
    
    async delete(id: string) {
        const userExists = await this.prisma.user.findUnique({ where: { id } });
    
        if (!userExists) {
            throw new Error('Esse usuário não existe');
        }
    
        return this.prisma.$transaction(async (prisma) => {
            // Apaga as associações do usuário na tabela associativa
            await prisma.userEstilo.deleteMany({
                where: { userId: id },
            });
    
            // Agora apaga o usuário
            return prisma.user.delete({
                where: { id },
            });
        });
    }

    async findUserWithStyles(userId: string) {
        const user = await this.prisma.user.findUnique({
          where: { id: userId },
          include: {
            estilos: true, // Inclui os estilos relacionados ao usuário
          },
        });
        return user;
      }

    async updateStyles(userId: string, styles: string[]) {
        console.log('Atualizando estilos para o usuário:', userId);
        console.log('Estilos recebidos:', styles);
      
        if (!Array.isArray(styles)) {
          throw new Error('Os estilos fornecidos não são um array.');
        }
        if (!userId) {
            throw new Error('ID do usuário não fornecido');
        }
    
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new Error(`Usuário com ID ${userId} não encontrado`);
        }

        try {
            const validStyles = await Promise.all(
                styles.map(async (styleId) => {
                    const style = await this.prisma.estilo.findUnique({
                        where: { id: styleId },
                    });
                    return style;
                })
            );
      
            const invalidStyles = validStyles.filter((style) => !style);
            if (invalidStyles.length > 0) {
                throw new Error(`Os seguintes estilos não foram encontrados: ${invalidStyles.map(s => s.id).join(', ')}`);
            }
      
            await this.prisma.$transaction(async (prisma) => {
                await prisma.userEstilo.deleteMany({ where: { userId } });
                await prisma.userEstilo.createMany({
                    data: validStyles.map((style) => ({
                        userId,
                        estiloId: style.id,
                    })),
                });
            });
        } catch (error) {
            console.error('Erro ao atualizar estilos:', error);
            throw new Error('Ocorreu um erro ao atualizar os estilos.');
        }
    }
}
