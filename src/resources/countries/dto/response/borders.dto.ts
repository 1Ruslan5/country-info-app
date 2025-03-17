import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class BorderCountryDto {
  @ApiProperty({ description: 'Common name of the country', example: 'Belarus' })
  @IsString()
  commonName: string;

  @ApiProperty({ description: 'Official name of the country', example: 'Republic of Belarus' })
  @IsString()
  officialName: string;

  @ApiProperty({ description: 'Country code', example: 'BY' })
  @IsString()
  countryCode: string;

  @ApiProperty({ description: 'Region of the country', example: 'Europe' })
  @IsString()
  region: string;

  @ApiProperty({
    description: 'List of bordering country codes (if available)',
    type: [String],
    nullable: true,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  borders?: undefined;
}
