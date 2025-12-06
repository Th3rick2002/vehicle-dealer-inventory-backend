import { StatusVehicleEnum } from '../interface/vehicle.interface';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateVehicleDto {
  @ApiProperty({
    description: 'Número VIN del vehículo (17 caracteres alfanuméricos)',
    example: '1HGBH41JXMN109186',
    minLength: 17,
    maxLength: 17,
    pattern: '^[A-HJ-NPR-Z0-9]{17}$',
  })
  @IsNotEmpty({ message: 'El VIN es requerido' })
  @IsString({ message: 'El VIN debe ser una cadena de texto' })
  @Length(17, 17, { message: 'El VIN debe tener exactamente 17 caracteres' })
  @Matches(/^[A-HJ-NPR-Z0-9]{17}$/, {
    message: 'El VIN debe contener solo caracteres válidos (sin I, O, Q)',
  })
  vin: string;

  @ApiProperty({
    description: 'Número de motor del vehículo',
    example: 'ABC123456789',
    maxLength: 50,
  })
  @IsNotEmpty({ message: 'El número de motor es requerido' })
  @IsString({ message: 'El número de motor debe ser una cadena de texto' })
  @Length(1, 50, {
    message: 'El número de motor debe tener entre 1 y 50 caracteres',
  })
  engine_number: string;

  @ApiProperty({
    description: 'Precio del vehículo en USD',
    example: 35000.0,
    minimum: 0.01,
  })
  @IsNotEmpty({ message: 'El precio es requerido' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El precio debe ser un número con máximo 2 decimales' },
  )
  @IsPositive({ message: 'El precio debe ser mayor a 0' })
  @Type(() => Number)
  price: number;

  @ApiProperty({
    description: 'Año de fabricación del vehículo',
    example: 2024,
    minimum: 1900,
  })
  @IsNotEmpty({ message: 'El año es requerido' })
  @IsInt({ message: 'El año debe ser un número entero' })
  @Min(1900, { message: 'El año debe ser mayor o igual a 1900' })
  @Max(new Date().getFullYear() + 1, {
    message: `El año no puede ser mayor a ${new Date().getFullYear() + 1}`,
  })
  @Type(() => Number)
  year: number;

  @ApiProperty({
    description: 'Estado actual del vehículo en el inventario',
    enum: StatusVehicleEnum,
    example: StatusVehicleEnum.En_Transito,
    default: StatusVehicleEnum.En_Transito,
    required: false,
  })
  @IsOptional()
  @IsEnum(StatusVehicleEnum, {
    message: 'El estado del vehículo debe ser un valor válido',
  })
  status?: StatusVehicleEnum;

  @ApiProperty({
    description:
      'Fecha de entrada al concesionario (formato ISO 8601: YYYY-MM-DD)',
    example: '2024-12-05',
    required: false,
  })
  @IsOptional()
  @IsDateString(
    {},
    {
      message:
        'La fecha de entrada debe ser una fecha válida en formato ISO 8601',
    },
  )
  entry_to_concessionary?: string;

  @ApiProperty({
    description: 'ID del color del vehículo',
    example: 1,
    minimum: 1,
  })
  @IsNotEmpty({ message: 'El color es requerido' })
  @IsInt({ message: 'El ID del color debe ser un número entero' })
  @IsPositive({ message: 'El ID del color debe ser mayor a 0' })
  @Type(() => Number)
  color: number;

  @ApiProperty({
    description: 'ID del modelo del vehículo',
    example: 5,
    minimum: 1,
  })
  @IsNotEmpty({ message: 'El modelo es requerido' })
  @IsInt({ message: 'El ID del modelo debe ser un número entero' })
  @IsPositive({ message: 'El ID del modelo debe ser mayor a 0' })
  @Type(() => Number)
  id_model: number;
}
