import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @ApiProperty({
    example: 'Polo',
    description: 'The name of the product',
  })
  name: string;

  @IsNumber()
  @ApiProperty({
    example: 49.99,
    description: 'The price of the product in USD',
  })
  price: number;

  @IsString()
  @ApiProperty({
    example: 'USA',
    description: 'The country where the product is made',
  })
  country: string;

  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'The unique ID of the product',
  })
  productId: number;
}
