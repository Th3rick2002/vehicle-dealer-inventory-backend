import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Country } from './interfaces/country.interface';

@Injectable()
export class CountryRepository {
  private readonly logger = new Logger(CountryRepository.name);

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async findAll(): Promise<Country[]> {
    const query = `
        SELECT 
          id_country, 
          name_country 
        FROM country
        ORDER BY id_country
    `;

    try {
      return await this.dataSource.query(query);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findById(id: number): Promise<Country | null> {
    const query = `
        SELECT 
          id_country,
          name_country
        FROM country
        WHERE id_country = $1
    `;

    try {
      const result: Country | null = await this.dataSource.query(query, [id]);
      return result || null;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async countryExists(countryId: number): Promise<boolean> {
    const query = `
      SELECT EXISTS(
        SELECT 1 FROM country WHERE id_country = $1
      ) as exists
    `;

    try {
      return await this.dataSource.query(query, [countryId]);
    } catch (error) {
      this.logger.error('Error al verificar existencia de país', error);
      throw error;
    }
  }
}
