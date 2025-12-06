import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandRepository } from './brand.repository';
import { CountryRepository } from '../country/country.repository';
import { Brand } from './interfaces/brand.interface';

@Injectable()
export class BrandService {
  constructor(
    private readonly brandRepository: BrandRepository,
    private readonly countryRepository: CountryRepository,
  ) {}

  async create(createBrandDto: CreateBrandDto) {
    const countryExists = await this.countryRepository.countryExists(
      createBrandDto.id_country,
    );

    if (!countryExists) {
      throw new BadRequestException(
        `El pais con id ${createBrandDto.id_country} no existe.`,
      );
    }

    const brandExists = await this.brandRepository.existsByName(
      createBrandDto.name_brand,
    );

    if (brandExists) {
      throw new ConflictException(
        `La marca ${createBrandDto.name_brand} ya existe.`,
      );
    }

    const brand: Brand = await this.brandRepository.create(createBrandDto);
    return await this.brandRepository.findById(brand.id_brand!);
  }

  async findAll() {
    const limit = 10;
    const offset = 0;
    return await this.brandRepository.findAll(limit, offset);
  }

  async findOne(id: number) {
    const brand = await this.brandRepository.findById(id);

    if (!brand) {
      throw new NotFoundException(`La marca con id ${id} no existe.`);
    }

    return brand;
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    const brand = await this.brandRepository.findById(id);

    if (!brand) {
      throw new NotFoundException(`La marca con id ${id} no existe.`);
    }

    if (updateBrandDto.id_country) {
      const country = await this.countryRepository.findById(
        updateBrandDto.id_country,
      );

      if (!country) {
        throw new BadRequestException(
          `El pais con id ${updateBrandDto.id_country} no existe.`,
        );
      }
    }

    return await this.brandRepository.update(id, updateBrandDto);
  }

  async remove(id: number) {
    await this.brandRepository.findById(id);

    const deleted = await this.brandRepository.softDelete(id);

    if (!deleted) {
      throw new NotFoundException(`No se pudo eliminar la marca con ID ${id}`);
    }
  }
}
