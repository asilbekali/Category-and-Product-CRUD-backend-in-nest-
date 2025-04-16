import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private CategoryModule: Model<Category>,
  ) {}

  async create(CreateCategoryDto: CreateCategoryDto): Promise<Category> {
    const createdCat = new this.CategoryModule(CreateCategoryDto);
    return createdCat.save();
  }

  async findAll() {
    return this.CategoryModule.find().exec();
  }

  async findOne(id: string) {
    const category = await this.CategoryModule.findById(id).exec();
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return 'sfd';
  }

  async remove(id: string) {
    const deletedCategory = await this.CategoryModule.findByIdAndDelete(id);

    if (!deletedCategory) {
      throw new Error(`Category with id ${id} not found!`);
    }

    return `Category deleted successfully!`;
  }
}
                     