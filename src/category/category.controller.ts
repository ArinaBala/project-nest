import { 
  Controller, Get, Param, Post, Put, Delete, Body, NotFoundException, HttpCode, HttpStatus 
} from '@nestjs/common';
import { CategoryService } from './category.service.js';
import type { CategoryType, CategoryCreateType } from './type/CategoryType.js';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAllCategories(): CategoryType[] {
    return this.categoryService.getCategories();
  }

  @Get(':id')
  getCategoryById(@Param('id') id: string): CategoryType {
    const category: CategoryType | undefined =
      this.categoryService.getCategoryById(Number(id));

    if (category !== undefined) {
      return category;
    }

    throw new NotFoundException('Category not found');
  }

  @Post()
  createCategory(@Body() categoryDto: CategoryCreateType): CategoryType {
    return this.categoryService.createCategory(categoryDto);
  }

  @Put(':id')
  updateCategory(
    @Param('id') id: string,
    @Body() categoryDto: Partial<CategoryCreateType>,
  ): CategoryType {
    const updatedCategory = this.categoryService.updateCategory(Number(id), categoryDto);
    if (updatedCategory !== undefined) {
      return updatedCategory;
    }
    throw new NotFoundException('Category not found for update');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteCategory(@Param('id') id: string): void {
    const isDeleted = this.categoryService.deleteCategory(Number(id));
    if (!isDeleted) {
      throw new NotFoundException('Category not found for deletion');
    }
  }
}