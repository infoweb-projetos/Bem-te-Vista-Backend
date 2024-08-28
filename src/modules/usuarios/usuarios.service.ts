import { Injectable } from '@nestjs/common';
import { UsuarioDTO } from './usuario.dto';
import { PrismaService } from 'src/database/PrismaService';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {

    constructor(private prisma: PrismaService) {}

    async create(data: UsuarioDTO) {
        // Hash da senha do usuário
        const hashedPassword = await bcrypt.hash(data.senha, 10);
    
        // Verifica se o usuário já existe
        const userExists = await this.prisma.user.findFirst({
            where: {
                email: data.email,
            },
        });
        
        if (userExists) {
            throw new Error('Email já cadastrado');
        }
        
        // Cria o novo usuário com a senha criptografada
        const user = await this.prisma.user.create({
            data: {
                ...data,
                senha: hashedPassword,
            },
        });
    
        return user;
    }
    

    async findAll(){
        return this.prisma.user.findMany();
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
    
    async update(id: string, data: UsuarioDTO){
        const userExists = await this.prisma.user.findUnique({
            where: {
                id,
            },
        })

        if(!userExists) {
            throw new Error('Esse usuário não existe');
        }
        return await this.prisma.user.update({
            data,
            where: {
                id,
            }
        })
    }
    
    async delete(id: string){
        const userExists = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });

        if(!userExists) {
            throw new Error('Esse usuário não existe');
        }

        return await this.prisma.user.delete({
            where: {
                id,
            },
        });
    }

    async updateStyles(userId: string, styles: string[]) {
        console.log('Atualizando estilos para o usuário:', userId); // Adicionar log para verificar o ID
      
        try {
          const user = await this.prisma.user.findUnique({
            where: { id: userId },
          });
      
          if (!user) {
            throw new Error(`Usuário com ID ${userId} não encontrado`); // Mensagem de erro mais específica
          }
      
          // Validar os estilos
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
            throw new Error(`Os seguintes estilos não foram encontrados: ${invalidStyles.join(', ')}`);
          }
      
          // Transação para garantir a consistência dos dados
          await this.prisma.$transaction(async (prisma) => {
            // Remover associações existentes
            await prisma.userEstilo.deleteMany({ where: { userId } });
      
            // Criar novas associações
            await prisma.userEstilo.createMany({
              data: validStyles.map((style) => ({
                userId,
                estiloId: style.id,
              })),
            });
          });
        }  catch (error) {
            console.error('Erro ao atualizar estilos:', error);
            throw new Error('Ocorreu um erro ao atualizar os estilos.');
          }
        }
    
}
