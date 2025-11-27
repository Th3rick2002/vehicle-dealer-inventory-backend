import { Injectable } from '@nestjs/common';
import { CountryRepository } from './country.repository';
import { Country } from './interfaces/country.interface';

@Injectable()
export class CountryService {
  constructor(private readonly countryRepository: CountryRepository) {}

  findAll(): Promise<Country[]> {
    return this.countryRepository.findAll();
  }

  findById(id: number): Promise<Country | null> {
    return this.countryRepository.findById(id);
  }
}
