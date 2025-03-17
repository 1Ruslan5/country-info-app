import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class AddHolidaysDto {
  @ApiProperty({ description: 'Country code (ISO format)', example: 'US' })
  @IsString()
  @IsNotEmpty()
  countryCode: string;

  @ApiProperty({ description: 'Year for which to fetch holidays', example: 2025 })
  @IsNumber()
  year: number;

  @ApiProperty({
    description: 'Optional list of holiday names to filter (if not provided, all holidays will be added)',
    example: ["New Year's Day", "Independence Day"],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  holidays?: string[];
}
