import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { ApiOperation, ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { CountryPopulationDto, CountryResponseDto } from './dto';
import { Public } from 'src/common/decorator';

@Public()
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Take a list of countries' })
  @ApiResponse({
    status: 200,
    description: 'Get a list of country',
    type: [CountryResponseDto],
  })
  async getAvailableCountries() :Promise<CountryResponseDto[]> {
    return await this.countriesService.getAvailableCountries();
  }

  @Get(':countryCode')
  @ApiSecurity('bearer')
  @ApiOperation({ summary: 'Get detail info about country' })
  @ApiResponse({
    status: 200,
    description: 'Detail info about country',
    type: CountryPopulationDto,
  })
  async getCountryInfo(
    @Param('countryCode') countryCode: string,
  ) {
    return await this.countriesService.getCountryInfo(countryCode);
  }
}
