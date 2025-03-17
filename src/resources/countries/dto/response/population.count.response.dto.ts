import { ApiProperty } from '@nestjs/swagger';
import { PopulationCountDto } from './populationcount.dto';
import { BorderCountryDto } from './borders.dto';

export class CountryPopulationDto {
  @ApiProperty({ description: 'Country Name', example: 'Arab World' })
  country: string;

  @ApiProperty({ description: 'Country code in iso2', example: 'UA' })
  code: string;

  @ApiProperty({ description: 'Country code in iso3', example: 'UKR' })
  iso3: string;

  @ApiProperty({
    description: 'Historical data about population',
    type: [PopulationCountDto],
  })
  populationCounts: PopulationCountDto[];

  @ApiProperty({ description: 'Link to flag', example: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg' })
  flag: string;

  @ApiProperty({
    description: 'List of bordering countries',
    type: [BorderCountryDto],
  })
  borders: BorderCountryDto[];
}