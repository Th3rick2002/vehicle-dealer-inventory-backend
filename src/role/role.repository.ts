import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Role } from './interfaces/role.interface';

@Injectable()
export class RoleRepository {
  private readonly logger = new Logger(RoleRepository.name);

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async findAll(): Promise<Role[]> {
    const query = `
        SELECT 
          id_role, 
          role 
        FROM role
        ORDER BY id_role
    `;

    try {
      return await this.dataSource.query(query);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findById(id: number): Promise<Role | null> {
    const query = `
        SELECT 
          id_role,
          role 
        FROM role
        WHERE id_role = $1
    `;

    try {
      return await this.dataSource.query(query, [id]);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
