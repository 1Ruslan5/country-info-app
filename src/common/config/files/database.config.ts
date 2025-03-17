import * as process from 'process';
import * as dotenv from 'dotenv';
dotenv.config();

export const databaseConfig = {
  type: 'postgres',

  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,

  entities: ['dist/resources/**/*.entity.js'],

  migrationsTableName: 'migration',
  migrations: ['dist/database/migrations/*.js'],

  ssl:
    process.env.NODE_ENV === 'production'
      ? {
          requestCert: true,
          rejectUnauthorized: false,
        }
      : false,
  autoLoadEntities: true,
  synchronize: false,
};
