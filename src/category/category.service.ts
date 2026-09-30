import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './dtos/category.entity.js';
import { Repository } from 'typeorm';
import { CategoryCreateReqDto } from './dtos/category_create.req.dto.js';
import { CategoryGetResDto } from './dtos/category_get.res.dto.js';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly _repository: Repository<Category>,
  ) {}

  
  async getCategories(): Promise<CategoryGetResDto[]> {
    const categories = await this._repository.find();
    return categories.map((cat) => ({
      id: cat.id,
      title: cat.title,
      slug: cat.slug,
      image: cat.image ?? '',
      parent_id: cat.parent_id,
    }));
  }

 
  async getCategoryById(id: number): Promise<CategoryGetResDto> {
    const category = await this._repository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return {
      id: category.id,
      title: category.title,
      slug: category.slug,
      image: category.image ?? '',
      parent_id: category.parent_id,
    };
  }


  async create(dto: CategoryCreateReqDto): Promise<CategoryGetResDto> {
    const category = this._repository.create({
      title: dto.title,
      slug: dto.slug,
      image: dto.image,
      is_show: dto.is_show,
      parent_id: dto.parent_id,
      description: dto.description,
    });
    const result = await this._repository.save(category);
    return {
      id: result.id,
      title: result.title,
      slug: result.slug,
      image: result.image ?? '',
      parent_id: result.parent_id,
    };
  }


  async update(id: number, dto: CategoryCreateReqDto): Promise<CategoryGetResDto> {
    const category = await this._repository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    category.title = dto.title;
    category.slug = dto.slug;
    category.image = dto.image ?? null;
    category.is_show = dto.is_show;
    category.parent_id = dto.parent_id;
    category.description = dto.description ?? '';

    const updated = await this._repository.save(category);
    return {
      id: updated.id,
      title: updated.title,
      slug: updated.slug,
      image: updated.image ?? '',
      parent_id: updated.parent_id,
    };
  }


  async patch(id: number, dto: Partial<CategoryCreateReqDto>): Promise<CategoryGetResDto> {
    const category = await this._repository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    Object.assign(category, dto);

    const updated = await this._repository.save(category);
    return {
      id: updated.id,
      title: updated.title,
      slug: updated.slug,
      image: updated.image ?? '',
      parent_id: updated.parent_id,
    };
  }

  
  async remove(id: number): Promise<{ message: string }> {
    const category = await this._repository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    await this._repository.remove(category);
    return { message: `Category with ID ${id} successfully deleted` };
  }
}