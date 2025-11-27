import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryRepository } from './country.repository';

@Module({
  controllers: [],
  providers: [CountryService, CountryRepository],
  exports: [CountryService, CountryRepository],
})
export class CountryModule {}
