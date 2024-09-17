import { IsString, IsOptional } from 'class-validator';

export class PostagemDTO {
  @IsString()
  conteudo: string;

  @IsOptional()
  @IsString()
  foto?: string;
}
  
  export class ComentarioDTO {
    conteudo: string;
  }
  