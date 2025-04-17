import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model, SortOrder } from 'mongoose';

@Injectable()
export class ProductService {
  @InjectModel(Product.name) private productModule: Model<Product>;

  async create(CreateProductDto: CreateProductDto): Promise<Product> {
    const createdPro = new this.productModule(CreateProductDto);
    console.log(createdPro);

    return createdPro.save();
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
        this.productModule
          .find(filter)
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .exec(),
        this.productModule.countDocuments(filter).exec(),
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
    const product = await this.productModule.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const updatedata = await this.productModule.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true, runValidators: true },
    );

    if (!updatedata) {
      throw new NotFoundException(`Product with ID "${id}" not found.`);
    }
    return updatedata;
  }

  async remove(id: string) {
    const deletedProduct = await this.productModule.findByIdAndDelete(id);

    if (!deletedProduct) {
      throw new Error(`Product with id ${id} not found!`);
    }

    return `Category deleted successfully!`;
  }
}
