import { Module } from '@nestjs/common';
import { PostagensController } from './postagens.controller';
import { PostagensService } from './postagens.service';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [PostagensController],
  providers: [PostagensService, PrismaService],
})
export class PostagensModule {}
