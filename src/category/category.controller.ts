import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CategoryService } from './category.service.js';
import { CategoryCreateReqDto } from './dtos/category_create.req.dto.js';
import { CategoryGetResDto } from './dtos/category_get.res.dto.js';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories(): Promise<CategoryGetResDto[]> {
    return await this.categoryService.getCategories();
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: string): Promise<CategoryGetResDto> {
    return await this.categoryService.getCategoryById(+id);
  }

  @Post()
  async createCategory(@Body() category: CategoryCreateReqDto): Promise<CategoryGetResDto> {
    return await this.categoryService.create(category);
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() dto: CategoryCreateReqDto,
  ): Promise<CategoryGetResDto> {
    return await this.categoryService.update(+id, dto);
  }

  @Patch(':id')
  async patchCategory(
    @Param('id') id: string,
    @Body() dto: Partial<CategoryCreateReqDto>,
  ): Promise<CategoryGetResDto> {
    return await this.categoryService.patch(+id, dto);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<{ message: string }> {
    return await this.categoryService.remove(+id);
  }
}