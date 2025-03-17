import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HolidayEvent } from './entities';

@Injectable()
export class HolidayEventsRepository {
  constructor(
    @InjectRepository(HolidayEvent)
    private readonly holidayRepository: Repository<HolidayEvent>,
  ) {}

  async createArray(
    createHolidayEventDtos: DeepPartial<HolidayEvent>[],
  ): Promise<HolidayEvent[]> {
    const result = await this.holidayRepository.insert(createHolidayEventDtos);
  
    return createHolidayEventDtos.map((dto, index) => ({
      ...dto,
      ...result.generatedMaps[index],
    })) as HolidayEvent[];
  }
}
