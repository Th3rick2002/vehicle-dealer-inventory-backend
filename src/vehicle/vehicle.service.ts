import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleRepository } from './vehicle.repository';
import { ColorService } from '../color/color.service';
import { ModelService } from '../model/model.service';

@Injectable()
export class VehicleService {
  constructor(
    private readonly vehicleRepository: VehicleRepository,
    private readonly modelService: ModelService,
    private readonly colorService: ColorService,
  ) {}

  async create(createVehicleDto: CreateVehicleDto) {
    const existsByEngineNumber = await this.validateEngineNumber(
      createVehicleDto.engine_number,
    );

    if (existsByEngineNumber) {
      throw new BadRequestException(
        `El vehiculo con el número de motor ${createVehicleDto.engine_number} ya existe.`,
      );
    }

    const existsByVinNumber = await this.existsByVinNumber(
      createVehicleDto.vin,
    );

    if (existsByVinNumber) {
      throw new BadRequestException(
        `El vehiculo con el número de VIN ${createVehicleDto.vin} ya existe.`,
      );
    }

    const existsColor = await this.colorService.findById(
      createVehicleDto.color,
    );

    if (existsColor === null) {
      throw new BadRequestException(
        `El color ${createVehicleDto.color} no existe.`,
      );
    }

    const modelExists = await this.modelService.findOne(
      createVehicleDto.id_model,
    );

    if (!modelExists) {
      throw new BadRequestException(
        `El modelo con id ${createVehicleDto.id_model} no existe.`,
      );
    }

    return await this.vehicleRepository.create(createVehicleDto);
  }

  findAll() {
    return this.vehicleRepository.findAll();
  }

  findOne(id: number) {
    return this.vehicleRepository.findById(id);
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
    if (updateVehicleDto.color) {
      const existsColor = await this.colorService.findById(
        updateVehicleDto.color,
      );

      if (existsColor === null) {
        throw new BadRequestException(
          `El color ${updateVehicleDto.color} no existe.`,
        );
      }
    }

    if (updateVehicleDto.id_model) {
      const modelExists = await this.modelService.findOne(
        updateVehicleDto.id_model,
      );

      if (!modelExists) {
        throw new BadRequestException(
          `El modelo con id ${updateVehicleDto.id_model} no existe.`,
        );
      }
    }

    return this.vehicleRepository.update(id, updateVehicleDto);
  }

  remove(id: number) {
    const vehicle = this.vehicleRepository.findById(id);

    if (vehicle === null) {
      throw new BadRequestException(`El vehiculo con id ${id} no existe.`);
    }

    return this.vehicleRepository.softDelete(id);
  }

  private async validateEngineNumber(engineNumber: string): Promise<boolean> {
    return await this.vehicleRepository.existsByEngineNumber(engineNumber);
  }

  private async existsByVinNumber(vinNumber: string): Promise<boolean> {
    return await this.vehicleRepository.existsByVin(vinNumber);
  }
}
