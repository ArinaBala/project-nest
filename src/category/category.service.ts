import { Injectable } from '@nestjs/common';
import { CategoryType, CategoryCreateType } from './type/CategoryType.js';

@Injectable()
export class CategoryService {
    private categories: CategoryType[] = [
    {
      id: 1,
      title: 'Furniture',
      image: 'furniture.png',
      parent_id: null,
    },
    {
      id: 2,
      title: 'Chairs',
      image: 'chairs.png',
      parent_id: 1,
    },
  ];
 
  getCategories(): CategoryType[] {
    return this.categories;
  }

  getCategoryById(id: number): CategoryType | undefined {
    return this.categories.find((category) => category.id === id);
  }

 
  
  createCategory(dto: CategoryCreateType): CategoryType {
    const maxId = this.categories.length > 0 
      ? Math.max(...this.categories.map(cat => cat.id)) 
      : 0;

    const newCategory: CategoryType = {
      id: maxId + 1,
      ...dto,
    };

    this.categories.push(newCategory);
    return newCategory;
  }

  

 
  updateCategory(id: number, dto: Partial<CategoryCreateType>): CategoryType | undefined {
    const index = this.categories.findIndex((category) => category.id === id);
    if (index === -1) {
      return undefined;
    }

    this.categories[index] = {
      ...this.categories[index],
      ...dto,
    };

    return this.categories[index];
  }

 
  deleteCategory(id: number): boolean {
    const index = this.categories.findIndex((category) => category.id === id);
    if (index === -1) {
      return false;
    }

    this.categories.splice(index, 1);
    return true;
  }
}