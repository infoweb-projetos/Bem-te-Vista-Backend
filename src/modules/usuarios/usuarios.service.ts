import { Injectable } from '@nestjs/common';
import { UsuarioDTO } from './usuario.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class UsuariosService {

    constructor(private prisma: PrismaService) {}

    async create(data: UsuarioDTO) {
        const userExists = await this.prisma.user.findFirst({
            where: {
                email: data.email
            }
        })
        if(userExists){
            throw new Error('Email já cadastrado')
        }
        
        const user = await this.prisma.user.create({
            data,
    })
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

        if(userExists) {
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

        if(userExists) {
            throw new Error('Esse usuário não existe');
        }

        return await this.prisma.user.delete({
            where: {
                id,
            },
        });
    }
}
