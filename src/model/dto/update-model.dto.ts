import { PartialType } from '@nestjs/mapped-types';
import { CreateModelDto } from './create-model.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  engineEnum,
  gearboxEnum,
  tractionEnum,
} from '../interfaces/model.interface';

export class UpdateModelDto extends PartialType(CreateModelDto) {
  @ApiPropertyOptional({ example: 'Civic' })
  name_model?: string;

  @ApiPropertyOptional({ enum: engineEnum, enumName: 'engineEnum' })
  engine_type?: engineEnum;

  @ApiPropertyOptional({ enum: gearboxEnum, enumName: 'gearboxEnum' })
  gearbox?: gearboxEnum;

  @ApiPropertyOptional({ example: 6 })
  number_of_speeds?: number;

  @ApiPropertyOptional({ example: 120 })
  maximum_speed?: number;

  @ApiPropertyOptional({ enum: tractionEnum, enumName: 'tractionEnum' })
  traction?: tractionEnum;

  @ApiPropertyOptional({ example: 1500 })
  cubic_capacity?: number;

  @ApiPropertyOptional({ example: 2.1 })
  width?: number;

  @ApiPropertyOptional({ example: 1.7 })
  height?: number;

  @ApiPropertyOptional({ example: 180 })
  power?: number;

  @ApiPropertyOptional({ example: 50 })
  battery?: number;

  @ApiPropertyOptional({ example: 4 })
  seats?: number;

  @ApiPropertyOptional({ example: 1 })
  made_in?: number;

  @ApiPropertyOptional({ example: 1 })
  id_brand?: number;
}
