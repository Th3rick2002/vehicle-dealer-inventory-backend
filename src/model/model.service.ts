import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { ModelRepository } from './model.repository';
import { BrandRepository } from '../brand/brand.repository';
import { CountryRepository } from '../country/country.repository';
import { Model, ModelWithRelations } from './interfaces/model.interface';

@Injectable()
export class ModelService {
  constructor(
    private readonly modelRepository: ModelRepository,
    private readonly brandRepository: BrandRepository,
    private readonly countryRepository: CountryRepository,
  ) {}

  async create(createModelDto: CreateModelDto): Promise<Model> {
    const model = await this.modelRepository.findByName(
      createModelDto.name_model,
    );

    if (model.length > 0) {
      throw new BadRequestException(
        `El modelo ${createModelDto.name_model} ya existe.`,
      );
    }

    const country = await this.countryRepository.findById(
      createModelDto.made_in,
    );

    if (!country) {
      throw new BadRequestException(
        `El pais con id ${createModelDto.made_in} no existe.`,
      );
    }

    const brandExists = await this.brandRepository.findById(
      createModelDto.id_brand,
    );

    if (!brandExists) {
      throw new BadRequestException(
        `La marca con id ${createModelDto.id_brand} no existe.`,
      );
    }

    return await this.modelRepository.create(createModelDto);
  }

  async findAll(): Promise<ModelWithRelations[]> {
    const limit = 10;
    const offset = 0;

    return await this.modelRepository.findAll(limit, offset);
  }

  findOne(id: number) {
    return this.modelRepository.findById(id);
  }

  findByName(name: string): Promise<ModelWithRelations[]> {
    return this.modelRepository.findByName(name);
  }

  update(id: number, updateModelDto: UpdateModelDto) {
    return `This action updates a #${id} model`;
  }

  async remove(id: number) {
    const model = await this.modelRepository.findById(id);

    if (!model) {
      throw new BadRequestException(`El modelo con id ${id} no existe.`);
    }

    return await this.modelRepository.softDelete(id);
  }
}
