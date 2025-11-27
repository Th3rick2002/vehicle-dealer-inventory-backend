import { Injectable } from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { ModelRepository } from './model.repository';
import { BrandRepository } from '../brand/brand.repository';
import { CountryRepository } from '../country/country.repository';
import { ModelWithRelations } from './interfaces/model.interface';

@Injectable()
export class ModelService {
  constructor(
    private readonly modelRepository: ModelRepository,
    private readonly brandRepository: BrandRepository,
    private readonly countryRepository: CountryRepository,
  ) {}

  create(createModelDto: CreateModelDto) {
    return 'This action adds a new model';
  }

  async findAll(): Promise<ModelWithRelations[]> {
    const limit = 10;
    const offset = 0;

    return await this.modelRepository.findAll(limit, offset);
  }

  findOne(id: number) {
    return `This action returns a #${id} model`;
  }

  update(id: number, updateModelDto: UpdateModelDto) {
    return `This action updates a #${id} model`;
  }

  remove(id: number) {
    return `This action removes a #${id} model`;
  }
}
