import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/country.entity.js';
import { City } from './entities/city.entity.js';
import { Address } from './entities/address.entity.js';
import { AddressService } from './address.service.js';
import { AddressController } from './address.controller.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Country, City, Address]),
  ],
  controllers: [AddressController],
  providers: [AddressService], 
  exports: [AddressService],
})
export class AddressModule {}