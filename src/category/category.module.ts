import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CategoryService } from './category.service.js';
import { CategoryController } from './category.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './dtos/category.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    ClientsModule.register([
      {
        name: 'REDIS_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}