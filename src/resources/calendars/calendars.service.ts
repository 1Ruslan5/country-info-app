import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { AddHolidaysDto } from './dto';
import { apiURLs } from 'src/common/constatnts';
import { AuthRepository } from '../auth/auth.repository';
import { HolidayEventsRepository } from './holiday.events.repository';
import { HolidayEvent } from './entities';

@Injectable()
export class CalendarsService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly holidayEventsRepository: HolidayEventsRepository,
  ) {}

  async addNationalHolidays(userId: string, { countryCode, year, holidays }: AddHolidaysDto): Promise<HolidayEvent[]> {

    const user = await this.authRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const response = await axios.get(apiURLs.holiday_events(year, countryCode));
    const allHolidays = response.data;

    let selectedHolidays = allHolidays;
    if (holidays && holidays.length > 0) {
      selectedHolidays = allHolidays.filter(
        (holiday: any) =>
          holidays.includes(holiday.localName) || holidays.includes(holiday.name),
      );
    }

    const holidayEntities = selectedHolidays.map((holiday: any) => {
      const event = new HolidayEvent();
      event.countryCode = countryCode;
      event.holidayName = holiday.localName || holiday.name;
      event.date = new Date(holiday.date);
      event.user = user;
      return event;
    });

    const holidayEvents = await this.holidayEventsRepository.createArray(holidayEntities);

    return holidayEvents
  }
}
