import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';

@Injectable()
export class ProductService {
  private products: Array<{
    id: number;
    title: string;
    price: number;
    image?: string;
    is_show: boolean;
    category_id: number;
  }> = [
    {
      id: 1,
      title: 'Laptop',
      price: 1200,
      image: 'laptop.png',
      is_show: true,
      category_id: 1,
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find((product) => product.id === id);
  }

  create(createProductDto: CreateProductDto) {
    const maxId = this.products.length > 0 
      ? Math.max(...this.products.map(p => p.id)) 
      : 0;

    const newProduct = {
      id: maxId + 1,
      ...createProductDto,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      return undefined;
    }

    this.products[index] = {
      ...this.products[index],
      ...updateProductDto,
    };

    return this.products[index];
  }

  remove(id: number) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      return false;
    }

    this.products.splice(index, 1);
    return true;
  }
}