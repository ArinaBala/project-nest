import { 
  Controller, Get, Post, Put, Patch, Delete, Param, Body, NotFoundException, HttpCode, HttpStatus 
} from '@nestjs/common';
import { ProductService } from './product.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const product = this.productService.findOne(Number(id));
    if (product !== undefined) {
      return product;
    }
    throw new NotFoundException('Product not found');
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Put(':id')
  updatePut(
    @Param('id') id: string,
    @Body() updateProductDto: CreateProductDto,
  ) {
    const updated = this.productService.update(Number(id), updateProductDto);
    if (updated !== undefined) {
      return updated;
    }
    throw new NotFoundException('Product not found for update');
  }

  @Patch(':id')
  updatePatch(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const updated = this.productService.update(Number(id), updateProductDto);
    if (updated !== undefined) {
      return updated;
    }
    throw new NotFoundException('Product not found for patch');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): void {
    const isDeleted = this.productService.remove(Number(id));
    if (!isDeleted) {
      throw new NotFoundException('Product not found for deletion');
    }
  }
}