import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User, UserLogin, UserWithRelations } from './interface/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  private readonly logger = new Logger(UserRepository.name);

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async findAll(): Promise<UserWithRelations[]> {
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
      WHERE U.delete_at IS NULL
    `

    try {
      return await this.dataSource.query(query);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

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

  async create(data: CreateUserDto): Promise<User> {
    const query = `
      INSERT INTO "user" (
        first_name,
        last_name,
        email,
        password,
        role
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id_user, first_name, last_name, email, role, create_at;
    `;

    try {
      const result = await this.dataSource.query(query, [
        data.first_name,
        data.last_name,
        data.email,
        data.password,
        data.role
      ]);

      return result[0];
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async update(id: string, data: UpdateUserDto): Promise<UserWithRelations | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let index = 1;

    for (const key in data) {
      fields.push(`${key} = $${index}`);
      values.push((data as any)[key]);
      index++;
    }

    if (fields.length === 0) return null;

    const query = `
      UPDATE "user"
      SET ${fields.join(', ')},
          update_at = NOW()
      WHERE id_user = $${index} AND delete_at IS NULL
      RETURNING 
      id_user, 
      first_name, 
      last_name, 
      email, 
      role, 
      update_at;
    `;

    values.push(id);

    try {
      const result = await this.dataSource.query(query, values);
      return result[0] || null;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async softDelete(id: string) {
    const query = `
      UPDATE "user"
      SET delete_at = NOW()
      WHERE id_user = $1 AND delete_at IS NULL
      RETURNING id_user, delete_at;
    `;

    try {
      const result = await this.dataSource.query(query, [id]);
      return result[0] || null;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async emailExistsForOtherUser(email: string, id: string): Promise<boolean> {
    const query = `
    SELECT id_user
    FROM "user"
    WHERE email = $1
      AND id_user <> $2
      AND delete_at IS NULL
    LIMIT 1
  `;

    try {
      const result = await this.dataSource.query(query, [email, id]);
      return result.length > 0;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
