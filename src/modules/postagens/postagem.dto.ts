import { IsString, IsOptional, IsNotEmpty,} from 'class-validator';

export class PostagemDTO {
  @IsString()
  conteudo: string;

  @IsOptional()
  @IsString()
  foto?: string;

  @IsOptional()
  likes: number; // Campo para curtidas
}

export class ComentarioDTO {
  @IsNotEmpty()
  @IsString()
  readonly conteudo: string;
}
