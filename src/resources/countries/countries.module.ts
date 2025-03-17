import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';

@Module({
  imports: [HttpModule],
  providers: [CountriesService],
  controllers: [CountriesController],
})
export class CountriesModule {}
