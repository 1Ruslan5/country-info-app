import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsNumber,
  IsString,
} from 'class-validator';

export class AppConfig {
  @IsNumber()
  public readonly port!: number;

  @IsString()
  public readonly jwtSecret!: string;
}

export class DatabaseConfig {
  @IsString()
  type: string;

  @IsString()
  host: string;

  @IsNumber()
  port: number;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  database: string;

  @IsArray()
  entities: string[];

  @IsString()
  migrationsTableName: string;

  @IsArray()
  migrations: string[];

  @IsBoolean()
  ssl: boolean;

  @IsBoolean()
  autoLoadEntities: boolean;

  @IsBoolean()
  synchronize: boolean;
}

export class Config {
  @IsDefined()
  @Type(() => AppConfig)
  public readonly app!: AppConfig;

  @IsDefined()
  @Type(() => DatabaseConfig)
  public readonly database!: DatabaseConfig;
}