import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiQuery } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
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
    return this.categoryService.findAll(name, order, page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }


  
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}

