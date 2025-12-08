import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Model, ModelWithRelations } from './interfaces/model.interface';

@Injectable()
export class ModelRepository {
  private readonly logger = new Logger(ModelRepository.name);

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async create(
    modelData: Omit<
      Model,
      'id_model' | 'create_at' | 'update_at' | 'delete_at'
    >,
  ): Promise<Model> {
    const query = `
      INSERT INTO model (name_model, engine_type, gearbox, number_of_speeds, maximum_speed, traction, cubic_capacity, width, height, power, battery, seats, made_in, id_brand)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING
        id_model,
        name_model,
        engine_type,
        gearbox,
        number_of_speeds
    `;

    try {
      return await this.dataSource.query(query, [
        modelData.name_model,
        modelData.engine_type,
        modelData.gearbox,
        modelData.number_of_speeds,
        modelData.maximum_speed,
        modelData.traction,
        modelData.cubic_capacity,
        modelData.width,
        modelData.height,
        modelData.power,
        modelData.battery,
        modelData.seats,
        modelData.made_in,
        modelData.id_brand,
      ]);
    } catch (error) {
      this.logger.error('Error al crear modelo', error);
      throw error;
    }
  }

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

  async findById(id: number): Promise<ModelWithRelations> {
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
      WHERE M.id_model = $1
    `;

    try {
      return await this.dataSource.query(query, [id]);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findByName(name: string): Promise<ModelWithRelations[]> {
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
      WHERE M.name_model = $1
      ORDER BY id_model
      LIMIT 10
      OFFSET 0
    `;

    try {
      return await this.dataSource.query(query, [name]);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async update(
    id: number,
    modelData: Partial<Model>,
  ): Promise<ModelWithRelations | null> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (modelData.engine_type !== undefined) {
      updates.push(`engine_type = $${paramIndex++}`);
      values.push(modelData.engine_type);
    }

    if (modelData.gearbox !== undefined) {
      updates.push(`gearbox = $${paramIndex++}`);
      values.push(modelData.gearbox);
    }

    if (modelData.number_of_speeds !== undefined) {
      updates.push(`number_of_speeds = $${paramIndex++}`);
      values.push(modelData.number_of_speeds);
    }

    if (modelData.maximum_speed !== undefined) {
      updates.push(`maximum_speed = $${paramIndex++}`);
      values.push(modelData.maximum_speed);
    }

    if (modelData.traction !== undefined) {
      updates.push(`traction = $${paramIndex++}`);
      values.push(modelData.traction);
    }

    if (modelData.cubic_capacity !== undefined) {
      updates.push(`cubic_capacity = $${paramIndex++}`);
      values.push(modelData.cubic_capacity);
    }

    if (modelData.width !== undefined) {
      updates.push(`width = $${paramIndex++}`);
      values.push(modelData.width);
    }

    if (modelData.height !== undefined) {
      updates.push(`height = $${paramIndex++}`);
      values.push(modelData.height);
    }

    if (modelData.power !== undefined) {
      updates.push(`power = $${paramIndex++}`);
      values.push(modelData.power);
    }

    if (modelData.battery !== undefined) {
      updates.push(`battery = $${paramIndex++}`);
      values.push(modelData.battery);
    }

    if (modelData.seats !== undefined) {
      updates.push(`seats = $${paramIndex++}`);
      values.push(modelData.seats);
    }

    if (modelData.made_in !== undefined) {
      updates.push(`made_in = $${paramIndex++}`);
      values.push(modelData.made_in);
    }

    if (modelData.id_brand !== undefined) {
      updates.push(`id_brand = $${paramIndex++}`);
      values.push(modelData.id_brand);
    }

    if (updates.length === 0) {
      return await this.findById(id);
    }

    updates.push(`update_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const query = `
      UPDATE brand 
      SET ${updates.join(', ')}
      WHERE id_brand = $${paramIndex} AND delete_at IS NULL
      RETURNING 
        id_brand,
        name_brand,
        id_country,
        update_at
    `;

    try {
      return await this.dataSource.query(query, values);
    } catch (error) {
      this.logger.error(`Error al actualizar marca con ID ${id}`, error);
      throw error;
    }
  }

  async softDelete(id: number): Promise<boolean> {
    const query = `
      UPDATE model 
      SET delete_at = CURRENT_TIMESTAMP
      WHERE id_model = $1 AND delete_at IS NULL
      RETURNING id_model
    `;

    try {
      return await this.dataSource.query(query, [id]);
    } catch (error) {
      this.logger.error(`Error al eliminar modelo con ID ${id}`, error);
      throw error;
    }
  }
}
