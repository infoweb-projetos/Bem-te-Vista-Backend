// estilo.dto.ts

export class EstiloDTO {
    id?: string;         // Opcional, pode ser utilizado para atualização ou identificação
    nome: string;        // Nome do estilo
  }

  import { IsArray, IsString } from 'class-validator';

export class UpdateStylesDto {
  @IsArray()
  @IsString({ each: true })
  styles: string[];
}