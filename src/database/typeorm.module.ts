import { Global, Module } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';
import { DatabaseConfig } from '../common/config/schemas';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource,
      inject: [DatabaseConfig],
      useFactory: async (databaseConfig: DatabaseConfig) => {
        try {
          const dataSource = new DataSource(
            databaseConfig as DataSourceOptions,
          );
          await dataSource.initialize();
          console.log('Database connected successfully');
          return dataSource;
        } catch (error) {
          console.log('Error connecting to database');
          throw error;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class TypeormModule {}
