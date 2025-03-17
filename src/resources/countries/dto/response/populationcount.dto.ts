import { ApiProperty } from "@nestjs/swagger";

export class PopulationCountDto {
  @ApiProperty({ description: 'Year', example: 1960 })
  year: number;

  @ApiProperty({ description: 'Population', example: 92197753 })
  population: number;
}