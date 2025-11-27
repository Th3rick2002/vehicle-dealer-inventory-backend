import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { CountryModule } from './country/country.module';
import { ColorModule } from './color/color.module';
import { BrandModule } from './brand/brand.module';
import { ModelModule } from './model/model.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { CommonModule } from './common/common.module';
import { EnvConfig } from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        type: 'postgres',
        host: ConfigService.get('DB_HOST'),
        port: ConfigService.get('DB_PORT'),
        username: ConfigService.get('DB_USER'),
        password: ConfigService.get('DB_PASSWORD'),
        database: ConfigService.get('DB_NAME'),
        entities: [],
        synchronize: false,
        migrationsRun: false,
        retryDelay: 3000,
        logging: process.env.NODE_ENV !== 'production',
        autoLoadEntities: false,
      }),
    }),
    RoleModule,
    UserModule,
    CountryModule,
    ColorModule,
    BrandModule,
    ModelModule,
    VehicleModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
