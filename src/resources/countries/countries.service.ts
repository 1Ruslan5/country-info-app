import { HttpService } from '@nestjs/axios';
import { Body, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CountryResponseDto } from './dto';
import { apiURLs } from 'src/common/constatnts';

@Injectable()
export class CountriesService {
  constructor(private readonly httpService: HttpService) {}

  async getAvailableCountries(): Promise<CountryResponseDto[]> {
    try {
      const { data } = await this.httpService.axiosRef.get(apiURLs.nager_available_countries);
    return data;
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async getCountryInfo(countryCode: string) {
    try {
      const { data: { borders, commonName } } = await this.httpService.axiosRef.get(
        apiURLs.nager_country_info(countryCode)
      );
      
      const { data: { data: { Iso3 }} } = await this.httpService.axiosRef.post(
        apiURLs.nager_country_codes_ISO2And3,
        {
          country: commonName,
        }
      );

      const { data: { data: dataPopulationResponse } } =
      await this.httpService.axiosRef.get(apiURLs.countriesnow_population);
  
      const dataPopulation = dataPopulationResponse.find(
        (item) => item.iso3 === Iso3
      );
  
      const populationCounts = dataPopulation
      ? dataPopulation.populationCounts.map((item) => ({
          year: Number(item.year),
          population: Number(item.value),
        }))
      : [];
  
      const { data: { data: { flag } } } = await this.httpService.axiosRef.post(
        apiURLs.countriesnow_flag_images, 
        {
          iso2: countryCode,
        }
      );

      const countryInfoDto = {
        country: countryCode,
        iso: Iso3,
        borders: borders || [],
        populationCounts,
        flag,
        
      };
  
      return countryInfoDto;
    } catch (error) {

      if(error.status === 404) {
        throw new NotFoundException(`Info about country with that code ${countryCode} not found`)
      }

      throw new InternalServerErrorException(error.message)
    }
  }
}
