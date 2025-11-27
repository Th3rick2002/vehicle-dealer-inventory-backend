import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBrandDto {
  @ApiProperty({ example: 'Ford' })
  @IsNotEmpty({ message: 'El nombre de marca es requerido'})
  @IsString()
  @Length(1, 50, {
    message: 'El nombre de marca debe tener entre 1 y 50 caracteres',
  })
  name_brand: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'El id del pais es requerido' })
  @IsNumber()
  @IsPositive({ message: 'El id del pais debe ser positivo' })
  id_country: number;
}
