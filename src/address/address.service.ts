import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './entities/country.entity.js';
import { City } from './entities/city.entity.js';
import { Address } from './entities/address.entity.js';
import axios from 'axios';

@Injectable()
export class AddressService implements OnModuleInit {
  private readonly logger = new Logger(AddressService.name);

  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
    @InjectRepository(City)
    private cityRepository: Repository<City>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async onModuleInit() {
    await this.seedCountriesAndCities();
  }

  async seedCountriesAndCities() {
    const count = await this.countryRepository.count();
    if (count > 0) {
      this.logger.log('Countries already seeded in database.');
      return;
    }

    this.logger.log('Seeding countries and cities from API...');

    try {
   const response = await axios.get('https://date.nager.at/api/v3/AvailableCountries');
const countriesData = response.data;


if (!Array.isArray(countriesData)) {
  console.error('API вернул не массив:', countriesData);
  return;
}


for (const item of countriesData) {
  const countryName = item.name;
  const iso2 = item.countryCode;

  if (!countryName) continue;

  const country = this.countryRepository.create({
    name: countryName,
    iso2: iso2 || '',
  });
  const savedCountry = await this.countryRepository.save(country);

  const city = this.cityRepository.create({
    name: `${countryName} Capital`,
    country_id: savedCountry.id,
  });
  await this.cityRepository.save(city);
}
      

      this.logger.log('Countries and cities successfully seeded!');
    } catch (error) {
      this.logger.error('Failed to seed countries and cities', String(error));
    }
  }


async findAllCountries() {
    return this.countryRepository.find({
      relations: {
        cities: true, 
      },
    });
  }
  async findCitiesByCountry(countryId: number) {
    return this.cityRepository.find({
      where: { country_id: countryId },
    });
  }

  async createAddressForUser(userId: number, cityId: number, street: string, zipCode: string) {
    const address = this.addressRepository.create({
      street,
      zip_code: zipCode,
      city_id: cityId,
      user_id: userId,
    });
    return this.addressRepository.save(address);
  }
}