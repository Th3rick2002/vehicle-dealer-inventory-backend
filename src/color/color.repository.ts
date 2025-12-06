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
          id_color,
          name_color 
        FROM color
        ORDER BY id_color
    `;

    try {
      return await this.dataSource.query(query);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findById(id: number): Promise<Color | null> {
    const query = `
        SELECT 
          id_color,
          name_color 
        FROM color
        WHERE id_color = $1
    `;

    try {
      return await this.dataSource.query(query, [id]);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
