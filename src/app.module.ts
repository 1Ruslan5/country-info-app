import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypedConfigModule } from 'nest-typed-config';
import { Config } from './common/config/schemas';
import { appConfig, databaseConfig } from './common/config/files';
import { TypeormModule } from './database/typeorm.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CountriesModule } from './resources/countries/countries.module';
import { AuthModule } from './resources/auth/auth.module';
import { CalendarModule } from './resources/calendars/calendars.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    TypedConfigModule.forRoot({
      schema: Config,
      load: () => {
        return {
          app: appConfig,
          database: databaseConfig,
        };
      },
    }),
    TypeormModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 20,
      },
    ]),
    CountriesModule,
    AuthModule,
    CalendarModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
