import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CountryResponseDto {
  @ApiProperty({ description: 'Country code', example: 'US' })
  @IsString()
  countryCode: string;

  @ApiProperty({ description: 'Country name', example: 'United States' })
  @IsString()
  name: string;
}
