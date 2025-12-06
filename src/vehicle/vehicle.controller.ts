import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @ApiOperation({ summary: 'Crear un nuevo vehiculo' })
  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehicleService.create(createVehicleDto);
  }

  @ApiOperation({ summary: 'Obtener todos los vehiculos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de vehiculos obtenida exitosamente',
    type: [CreateVehicleDto],
  })
  @Get()
  findAll() {
    return this.vehicleService.findAll();
  }

  @ApiOperation({ summary: 'Obtener un vehiculo por su id' })
  @ApiResponse({
    status: 200,
    description: 'Vehiculo obtenido exitosamente',
    type: [CreateVehicleDto],
  })
  @ApiResponse({
    status: 404,
    description: 'Vehiculo no encontrado',
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID del vehiculo' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vehicleService.findOne(+id);
  }

  @ApiOperation({ summary: 'Actualizar un vehiculo existente' })
  @ApiResponse({
    status: 200,
    description: 'Vehiculo actualizado exitosamente',
    type: UpdateVehicleDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Vehiculo no encontrado',
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID del vehiculo' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    return this.vehicleService.update(id, updateVehicleDto);
  }

  @ApiOperation({ summary: 'Eliminar un vehiculo (soft delete)' })
  @ApiResponse({
    status: 200,
    description: 'Vehiculo eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Vehiculo no encontrado',
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID del vehiculo' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.vehicleService.remove(+id);
  }
}
