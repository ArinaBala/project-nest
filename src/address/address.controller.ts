import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service.js';
import { Address } from './entities/address.entity.js';

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('countries')
  async getCountries() {
    return this.addressService.findAllCountries();
  }

  // <--- Додаємо ендпоинт для отримання міст за ID країни
  @Get('countries/:countryId/cities')
  async getCitiesByCountry(@Param('countryId') countryId: number) {
    return this.addressService.findCitiesByCountry(countryId);
  }

  @Post()
  async createAddress(
    @Body() body: { street: string; zipCode: string; cityId: number; userId: number }
  ) {
    return this.addressService.createAddressForUser(
      body.userId,
      body.cityId,
      body.street,
      body.zipCode,
    );
  }
}