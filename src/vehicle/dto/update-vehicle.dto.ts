import { PartialType } from '@nestjs/mapped-types';
import { CreateVehicleDto } from './create-vehicle.dto';
import { ApiProperty } from '@nestjs/swagger';
import { StatusVehicleEnum } from '../interface/vehicle.interface';

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {
  @ApiProperty({ example: 35000.0 })
  price: number;

  @ApiProperty({ example: 2024 })
  year: number;

  @ApiProperty({
    enum: StatusVehicleEnum,
    example: StatusVehicleEnum.Disponible,
  })
  status: StatusVehicleEnum;

  @ApiProperty({ description: 'ID del color del vehículo', example: 1 })
  color: number;

  @ApiProperty({ description: 'ID del modelo del vehículo', example: 5 })
  id_model: number;
}
