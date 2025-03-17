export const apiURLs = {
  nager_available_countries: 'https://date.nager.at/api/v3/AvailableCountries',
  nager_country_info: (countryCode: string) => `https://date.nager.at/api/v3/CountryInfo/${countryCode}`,
  nager_public_holidays: (year: number, countryCode: string) =>
    `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`,
  nager_country_codes_ISO2And3: 'https://countriesnow.space/api/v0.1/countries/iso',
  countriesnow_population: 'https://countriesnow.space/api/v0.1/countries/population',
  countriesnow_flag_images: `https://countriesnow.space/api/v0.1/countries/flag/images`,
  holiday_events: (year: number, countryCode: string) => `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`,
};
