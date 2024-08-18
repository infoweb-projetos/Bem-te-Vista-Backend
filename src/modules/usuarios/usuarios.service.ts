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

}
