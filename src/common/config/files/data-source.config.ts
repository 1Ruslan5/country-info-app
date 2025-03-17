import { DataSource } from 'typeorm';
import * as process from 'process';
import { config } from 'dotenv';
config();

const AppDataSource = new DataSource({
  type: 'postgres',

  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,

  entities: ['dist/resources/**/*.entity.js'],

  migrations: ['dist/database/migrations/*.js'],
  migrationsRun: false,

  synchronize: false,
  ssl:
    process.env.NODE_ENV === 'production'
      ? {
          requestCert: true,
          rejectUnauthorized: false,
        }
      : false,
});

export default AppDataSource;