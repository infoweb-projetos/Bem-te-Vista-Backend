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
        // Verifica se o usuário existe
        const userExists = await this.prisma.user.findUnique({
            where: { id: userId },
        });
    
        if (!userExists) {
            throw new Error('Usuário não encontrado');
        }
    
        // Remove os estilos existentes do usuário
        await this.prisma.userEstilo.deleteMany({
            where: { userId },
        });
    
        // Adiciona os novos estilos
        const userStyles = styles.map(styleId => ({
            userId,
            estiloId: styleId,
        }));
    
        return this.prisma.userEstilo.createMany({
            data: userStyles,
        });
    }
    
}
