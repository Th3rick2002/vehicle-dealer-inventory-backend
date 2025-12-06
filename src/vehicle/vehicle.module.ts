import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { VehicleRepository } from './vehicle.repository';
import { CountryModule } from '../country/country.module';
import { ColorModule } from '../color/color.module';
import { BrandModule } from '../brand/brand.module';
import { ModelModule } from '../model/model.module';

@Module({
  imports: [CountryModule, ColorModule, BrandModule, ModelModule],
  controllers: [VehicleController],
  providers: [VehicleService, VehicleRepository],
})
export class VehicleModule {}
