import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import {
  engineEnum,
  gearboxEnum,
  tractionEnum,
} from '../interfaces/model.interface';

export class CreateModelDto {
  @ApiProperty({ example: 'Civic' })
  @IsNotEmpty({ message: 'El nombre del modelo es requerido' })
  @IsString()
  @MinLength(1, {
    message: 'El nombre del modelo debe tener al menos 1 caracter',
  })
  name_model: string;

  @ApiProperty({ enum: engineEnum, enumName: 'engineEnum' })
  @IsNotEmpty({ message: 'El tipo de motor es requerido' })
  @IsEnum(engineEnum, {
    message: 'El tipo de motor debe ser GASOLINA, ELECTRICO, HIBRIDO o DIESEL',
  })
  engine_type: engineEnum;

  @ApiProperty({ enum: gearboxEnum, enumName: 'gearboxEnum' })
  @IsNotEmpty({
    message: 'El tipo de caja de cambios es requerido',
  })
  @IsEnum(gearboxEnum, {
    message: 'El tipo de caja de cambios debe ser MANUAL o AUTOMATICO',
  })
  gearbox: gearboxEnum;

  @ApiProperty({ example: 6 })
  @IsNotEmpty({ message: 'El número de velocidades es requerido' })
  @IsNumber()
  @IsPositive({ message: 'El número de velocidades debe ser positivo' })
  @Min(4, { message: 'El minimo de velocidades es 4' })
  number_of_speeds: number;

  @ApiProperty({ example: 120 })
  @IsNotEmpty({ message: 'El maximo de velocidad es requerido' })
  @IsNumber()
  @IsPositive({ message: 'El maximo de velocidad debe ser positivo' })
  @Min(40, { message: 'El minimo de velocidad es 40' })
  maximum_speed: number;

  @ApiProperty({ enum: tractionEnum, enumName: 'tractionEnum' })
  @IsNotEmpty({ message: 'El tipo de traccion es requerido' })
  @IsEnum(tractionEnum, {
    message: 'El tipo de traccion debe ser FWD, RWD, AWD o 4WD',
  })
  traction: tractionEnum;

  @ApiProperty({ example: 1500 })
  @IsNotEmpty({ message: 'La capacidad de carga es requerida' })
  @IsNumber()
  @IsPositive({ message: 'La capacidad de carga debe ser positiva' })
  cubic_capacity: number;

  @ApiProperty({ example: 2.1 })
  @IsNotEmpty({ message: 'El ancho es requerido' })
  @IsNumber()
  @IsPositive({ message: 'El ancho debe ser positivo' })
  width: number;

  @ApiProperty({ example: 1.7 })
  @IsNotEmpty({ message: 'La altura es requerida' })
  @IsNumber()
  @IsPositive({ message: 'La altura debe ser positiva' })
  height: number;

  @ApiProperty({ example: 180 })
  @IsNotEmpty({ message: 'La potencia es requerida' })
  @IsNumber()
  @IsPositive({ message: 'La potencia debe ser positiva' })
  power: number;

  @ApiProperty({ example: 50 })
  @IsNotEmpty({ message: 'La bateria es requerida' })
  @IsNumber()
  @IsPositive({ message: 'El número de KWH de la bateria debe ser positivo' })
  battery: number;

  @ApiProperty({ example: 4 })
  @IsNotEmpty({ message: 'El numero de asientos es requerido' })
  @IsNumber()
  @IsPositive({ message: 'El numero de asientos debe ser positivo' })
  seats: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty({
    message: 'El id del pais donde se fabrico el modelo es requerido',
  })
  @IsNumber()
  @IsPositive({ message: 'El id del pais debe ser positivo' })
  made_in: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'El id de la marca es requerido' })
  @IsNumber()
  @IsPositive({ message: 'El id de la marca debe ser positivo' })
  id_brand: number;
}
