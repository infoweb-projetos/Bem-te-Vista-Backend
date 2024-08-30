// estilo.dto.ts

export class EstiloDTO {
    id?: string;         // Opcional, pode ser utilizado para atualização ou identificação
    nome: string;        // Nome do estilo
  }

  export class UpdateStylesDto {
    styles: string[];
}