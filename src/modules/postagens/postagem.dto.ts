import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class PostagemDTO {
  @IsString()
  conteudo: string;

  @IsOptional()
  @IsString()
  foto?: string;
}

export class ComentarioDTO {
  @IsNotEmpty()
  @IsString()
  readonly conteudo: string;
}
