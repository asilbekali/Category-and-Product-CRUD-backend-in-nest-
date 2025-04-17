import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model, SortOrder } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private CategoryModule: Model<Category>,
  ) {}

  async create(CreateCategoryDto: CreateCategoryDto): Promise<Category> {
    const createdCat = new this.CategoryModule(CreateCategoryDto);
    return createdCat.save();
  }

  async findAll(
    name?: string,
    order?: string,
    page: number = 1,
    limit: number = 10,
  ) {
    const filter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const sort: Record<string, SortOrder> = { name: order === 'asc' ? 1 : -1 };
    const skip = Math.max(0, (page - 1) * limit);

    try {
      const [items, totalItems] = await Promise.all([
        this.CategoryModule.find(filter)
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .exec(),
        this.CategoryModule.countDocuments(filter).exec(),
      ]);

      return {
        items,
        totalItems,
        page,
        limit,
      };
    } catch (error) {
      throw new Error(`Error fetching categories: ${error.message}`);
    }
  }

  async findOne(id: string) {
    const category = await this.CategoryModule.findById(id).exec();
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const updatedata = await this.CategoryModule.findByIdAndUpdate(
      id,
      updateCategoryDto,
      { new: true, runValidators: true },
    );

    if (!updatedata) {
      throw new NotFoundException(`Category with ID "${id}" not found.`);
    }
    return updatedata;
  }

  async remove(id: string) {
    const deletedCategory = await this.CategoryModule.findByIdAndDelete(id);

    if (!deletedCategory) {
      throw new Error(`Category with id ${id} not found!`);
    }

    return `Category deleted successfully!`;
  }
}
