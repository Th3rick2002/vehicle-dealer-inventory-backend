import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';
import { CountryModule } from '../country/country.module';
import { BrandModule } from '../brand/brand.module';
import { ModelRepository } from './model.repository';
import { ColorModule } from '../color/color.module';

@Module({
  imports: [CountryModule, ColorModule, BrandModule],
  controllers: [ModelController],
  providers: [ModelService, ModelRepository],
})
export class ModelModule {}
