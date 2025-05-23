import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto)
  }
  
  @ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'], description: 'Sort order' }) 
  @ApiQuery({ name: 'name', required: false, description: 'Category name to search for' })
  @ApiQuery({ name: 'page', required: false, description: 'Category page' })
  @ApiQuery({ name: 'limit', required: false, description: 'Category limit' })
  

  @Get()
  findAll(
    @Query("name") name?: string,
    @Query("order") order?: string,
    @Query("page") page = 1,
    @Query("limit") limit = 10,

  ) {
    return this.productService.findAll(name, order, page, limit);
  }

  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
