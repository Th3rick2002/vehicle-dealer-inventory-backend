import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserLogin, UserWithRelations } from './interface/user.interface';

@Injectable()
export class UserRepository {
  private readonly logger = new Logger(UserRepository.name);

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async findUserByEmail(email: string): Promise<UserLogin | null> {
    const query = `
        SELECT
          id_user,
          email,
          password
        FROM "user" 
        WHERE email = $1
    `;

    try {
      const result = await this.dataSource.query(query, [email]);
      return result[0] || null;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findUser(id: string): Promise<UserWithRelations | null> {
    const query = `
        SELECT
          U.id_user,
          U.first_name,
          U.last_name,
          U.role,
          R.role,
          U.email
        FROM "user" U
        INNER JOIN role R ON U.role = R.id_role
        WHERE id_user = $1 AND U.delete_at IS NULL
    `;

    try {
      const result = await this.dataSource.query(query, [id]);
      return result[0] || null;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
