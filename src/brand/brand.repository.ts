import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Brand, BrandWithRelations } from './interfaces/brand.interface';

@Injectable()
export class BrandRepository {
  private readonly logger = new Logger(BrandRepository.name);

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async findAll(limit: number, offset: number): Promise<BrandWithRelations[]> {
    const query = `
      SELECT
        B.id_brand,
        B.name_brand,
        C.id_country,
        C.name_country,
        B.create_at
      FROM brand AS B
      INNER JOIN country AS C ON B.id_country = C.id_country
      WHERE B.delete_at IS NULL
      ORDER BY id_brand
    `;

    try {
      return await this.dataSource.query(query);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findById(id: number): Promise<BrandWithRelations | null> {
    const query = `
      SELECT
        B.id_brand,
        B.name_brand,
        B.id_country,
        C.name_country,
        b.create_at
      FROM brand AS b
      INNER JOIN country AS c ON b.id_country = c.id_country
      WHERE b.id_brand = $1 AND b.delete_at IS NULL
      LIMIT 1
    `;

    try {
      const result: BrandWithRelations | null = await this.dataSource.query(
        query,
        [id],
      );
      return result || null;
    } catch (error) {
      this.logger.error(`Error al obtener marca con ID ${id}`, error);
      throw error;
    }
  }

  async existsByName(name: string, excludeId?: number): Promise<boolean> {
    let query = `
        SELECT EXISTS(
            SELECT 1 FROM brand 
            WHERE LOWER(name_brand) = LOWER($1) 
            AND delete_at IS NULL
    `;

    const params: any[] = [name];

    if (excludeId) {
      query += ` AND id_brand != $2`;
      params.push(excludeId);
    }

    query += `) AS exists`;

    try {
      const result = await this.dataSource.query(query, params);
      return result[0]?.exists === true;
    } catch (error) {
      this.logger.error('Error al verificar existencia de marca', error);
      throw error;
    }
  }

  async create(
    brandData: Omit<
      Brand,
      'id_brand' | 'create_at' | 'update_at' | 'delete_at'
    >,
  ): Promise<Brand> {
    const query = `
      INSERT INTO brand (name_brand, id_country)
      VALUES ($1, $2)
      RETURNING
        id_brand,
        name_brand,
        id_country,
        create_at
    `;

    try {
      return await this.dataSource.query(query, [
        brandData.name_brand,
        brandData.id_country,
      ]);
    } catch (error) {
      this.logger.error('Error al crear marca', error);
      throw error;
    }
  }

  async update(
    id: number,
    brandData: Partial<Brand>,
  ): Promise<BrandWithRelations | null> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (brandData.name_brand !== undefined) {
      updates.push(`name_brand = $${paramIndex++}`);
      values.push(brandData.name_brand);
    }

    if (brandData.id_country !== undefined) {
      updates.push(`id_country = $${paramIndex++}`);
      values.push(brandData.id_country);
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
      UPDATE brand 
      SET delete_at = CURRENT_TIMESTAMP
      WHERE id_brand = $1 AND delete_at IS NULL
      RETURNING id_brand
    `;

    try {
      return await this.dataSource.query(query, [id]);
    } catch (error) {
      this.logger.error(`Error al eliminar marca con ID ${id}`, error);
      throw error;
    }
  }
}
