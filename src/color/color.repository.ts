import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import type { Color } from './interfaces/color.interface';

@Injectable()
export class ColorRepository {
  private readonly logger = new Logger(ColorRepository.name);

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async findAll(): Promise<Color[]> {
    const query = `
        SELECT 
          idColor, 
          name_color 
        FROM color
        ORDER BY idColor
    `;

    try {
      return await this.dataSource.query(query);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
