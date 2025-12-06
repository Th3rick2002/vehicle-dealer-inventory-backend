import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Vehicle, VehicleWithDetails } from './interface/vehicle.interface';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehicleRepository {
  private readonly logger = new Logger(VehicleRepository.name);

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async findAll(): Promise<VehicleWithDetails[]> {
    const query = `
      SELECT
        V.id_vehicle,
        V.vin,
        V.engine_number,
        V.price,
        V.year,
        V.status,
        V.entry_to_concessionary,
        V.color,
        C.name_color,
        V.id_model,
        M.name_model,
        CO.name_country AS made_in,
        M.engine_type,
        M.gearbox,
        M.seats,
        B.id_brand,
        B.name_brand,
        V.create_at
      FROM vehicle V
      INNER JOIN model M ON V.id_model = M.id_model
      INNER JOIN brand B ON M.id_brand = B.id_brand
      INNER JOIN color C ON V.color = C.id_color
      INNER JOIN country CO ON M.made_in = CO.id_country
      WHERE V.delete_at IS NULL
      ORDER BY V.id_vehicle;
    `;

    try {
      return await this.dataSource.query(query);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findById(id: number): Promise<Vehicle | null> {
    const query = `
      SELECT
        V.id_vehicle,
        V.vin,
        V.engine_number,
        V.price,
        V.year,
        V.status,
        V.entry_to_concessionary,
        V.color,
        C.name_color,
        V.id_model,
        M.name_model,
        M.made_in,
        M.engine_type,
        M.gearbox,
        M.seats,
        B.id_brand,
        B.name_brand,
        V.create_at
      FROM vehicle V
      INNER JOIN model M ON V.id_model = M.id_model
      INNER JOIN brand B ON M.id_brand = B.id_brand
      INNER JOIN color C ON V.color = C.id_color
      WHERE V.id_vehicle = $1
      ORDER BY V.id_vehicle;
    `;

    try {
      return await this.dataSource.query(query, [id]);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async create(vehicleData: CreateVehicleDto): Promise<Vehicle> {
    const query = `
      INSERT INTO vehicle (
        vin,
        engine_number,
        price,
        year,
        status,
        entry_to_concessionary,
        color,
        id_model
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING 
        id_vehicle,
        vin,
        engine_number,
        price,
        year,
        status,
        entry_to_concessionary,
        color,
        id_model,
        create_at
    `;

    const values = [
      vehicleData.vin.toUpperCase(),
      vehicleData.engine_number.toUpperCase(),
      vehicleData.price,
      vehicleData.year,
      vehicleData.status || 'En_Transito',
      vehicleData.entry_to_concessionary || new Date(),
      vehicleData.color,
      vehicleData.id_model,
    ];

    try {
      return await this.dataSource.query(query, values);
    } catch (error) {
      this.logger.error('Error al crear vehículo', error);
      throw error;
    }
  }

  async update(
    id: number,
    vehicleData: UpdateVehicleDto,
  ): Promise<Vehicle | null> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (vehicleData.price !== undefined) {
      updates.push(`price = $${paramIndex++}`);
      values.push(vehicleData.price);
    }

    if (vehicleData.year !== undefined) {
      updates.push(`year = $${paramIndex++}`);
      values.push(vehicleData.year);
    }

    if (vehicleData.status !== undefined) {
      updates.push(`status = $${paramIndex++}`);
      values.push(vehicleData.status);
    }

    if (vehicleData.entry_to_concessionary !== undefined) {
      updates.push(`entry_to_concessionary = $${paramIndex++}`);
      values.push(vehicleData.entry_to_concessionary);
    }

    if (vehicleData.color !== undefined) {
      updates.push(`color = $${paramIndex++}`);
      values.push(vehicleData.color);
    }

    if (vehicleData.id_model !== undefined) {
      updates.push(`id_model = $${paramIndex++}`);
      values.push(vehicleData.id_model);
    }

    if (updates.length === 0) {
      return null;
    }

    // Siempre actualizar update_at
    updates.push(`update_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const query = `
      UPDATE vehicle 
      SET ${updates.join(', ')}
      WHERE id_vehicle = $${paramIndex} AND delete_at IS NULL
      RETURNING 
        id_vehicle,
        vin,
        engine_number,
        price,
        year,
        status,
        entry_to_concessionary,
        color,
        id_model,
        create_at,
        update_at
    `;

    try {
      return await this.dataSource.query(query, values);
    } catch (error) {
      this.logger.error(`Error al actualizar vehículo con ID ${id}`, error);
      throw error;
    }
  }

  async findByStatus(status: string): Promise<VehicleWithDetails[]> {
    const query = `
      SELECT
        V.id_vehicle,
        V.vin,
        V.price,
        V.year,
        V.status,
        C.name_color AS color_name,
        M.name_model AS model_name,
        B.name_brand AS brand_name,
        V.entry_to_concessionary,
        V.create_at
      FROM vehicle V
      INNER JOIN model M ON V.id_model = M.id_model
      INNER JOIN brand B ON M.id_brand = B.id_brand
      INNER JOIN color C ON V.color = C.id_color
      WHERE V.status = $1 AND V.delete_at IS NULL
      ORDER BY V.create_at DESC
    `;

    try {
      return await this.dataSource.query(query, [status]);
    } catch (error) {
      this.logger.error('Error al buscar vehículos por estado', error);
      throw error;
    }
  }

  async softDelete(id: number): Promise<boolean> {
    const query = `
      UPDATE vehicle 
      SET delete_at = CURRENT_TIMESTAMP
      WHERE id_vehicle = $1 AND delete_at IS NULL
      RETURNING id_vehicle
    `;

    try {
      return await this.dataSource.query(query, [id]);
    } catch (error) {
      this.logger.error(`Error al eliminar vehículo con ID ${id}`, error);
      throw error;
    }
  }

  async existsByVin(vin: string, excludeId?: number): Promise<boolean> {
    let query = `
      SELECT EXISTS(
        SELECT 1 FROM vehicle 
        WHERE UPPER(vin) = UPPER($1) 
        AND delete_at IS NULL
    `;

    const params: any[] = [vin];

    if (excludeId) {
      query += ` AND id_vehicle != $2`;
      params.push(excludeId);
    }

    query += `) as exists`;

    try {
      return await this.dataSource.query(query, params);
    } catch (error) {
      this.logger.error('Error al verificar existencia de VIN', error);
      throw error;
    }
  }

  async existsByEngineNumber(
    engineNumber: string,
    excludeId?: number,
  ): Promise<boolean> {
    let query = `
      SELECT EXISTS(
        SELECT 1 FROM vehicle 
        WHERE UPPER(engine_number) = UPPER($1) 
        AND delete_at IS NULL
    `;

    const params: any[] = [engineNumber];

    if (excludeId) {
      query += ` AND id_vehicle != $2`;
      params.push(excludeId);
    }

    query += `) as exists`;

    try {
      return await this.dataSource.query(query, params);
    } catch (error) {
      this.logger.error(
        'Error al verificar existencia de número de motor',
        error,
      );
      throw error;
    }
  }
}
