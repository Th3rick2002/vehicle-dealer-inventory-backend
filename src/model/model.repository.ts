import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ModelWithRelations } from './interfaces/model.interface';

@Injectable()
export class ModelRepository {
  private readonly logger = new Logger(ModelRepository.name);

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async findAll(limit: number, offset: number): Promise<ModelWithRelations[]> {
    const query = `
      SELECT
        M.id_model,
        M.name_model,
        M.engine_type,
        M.gearbox,
        M.number_of_speeds,
        M.maximum_speed,
        M.traction,
        M.cubic_capacity,
        M.width,
        M.height,
        M.power,
        M.battery,
        M.seats,
        C.name_country AS made_in,
        M.id_brand,
        B.name_brand,
        M.create_at
      FROM model M
      INNER JOIN brand B ON M.id_brand = B.id_brand
      INNER JOIN country C ON M.made_in = C.id_country
      ORDER BY id_model
      LIMIT $1
      OFFSET $2
    `;

    try {
      return await this.dataSource.query(query, [limit, offset]);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
