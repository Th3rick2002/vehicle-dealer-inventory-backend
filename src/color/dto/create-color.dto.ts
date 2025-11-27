import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateColorDto {
  @ApiProperty({ example: 'Rojo' })
  @IsNotEmpty({ message: 'El nombre de color es requerido' })
  @IsString()
  @MinLength(1, {
    message: 'El nombre de color debe tener al menos 1 caracter',
  })
  name_color: string;
}
