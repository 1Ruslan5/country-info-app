import { Controller, Post, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CalendarsService } from './calendars.service';
import { AddHolidaysDto } from './dto';
import { Public } from 'src/common/decorator';

@Public()
@ApiTags('Calendars')
@Controller('calendar')
export class CalendarsController {
  constructor(private readonly calendarService: CalendarsService) {}

  @Post('users/:userId/holidays')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add national holidays to the user`s calendar' })
  @ApiResponse({
    status: 201,
    description: 'Holidays added successfully',
  })
  async addHolidays(
    @Param('userId') userId: string,
    @Body() addHolidaysDto: AddHolidaysDto,
  ) {
    return this.calendarService.addNationalHolidays(userId, addHolidaysDto);
  }
}
