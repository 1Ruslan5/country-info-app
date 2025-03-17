import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { HolidayEvent } from './entities';
import { CalendarsService } from './calendars.service';
import { CalendarsController } from './calendars.controller';
import { HolidayEventsRepository } from './holiday.events.repository';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([HolidayEvent]),
    AuthModule,
    HttpModule,
  ],
  providers: [
    CalendarsService, 
    HolidayEventsRepository
  ],
  controllers: [CalendarsController],
  exports: [CalendarsService],
})
export class CalendarModule {}
