import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty({
        example: "Polo",
        description: "The name of the product"
    })
    name: string;

    @ApiProperty({
        example: 49.99,
        description: "The price of the product in USD"
    })
    price: number;

    @ApiProperty({
        example: "USA",
        description: "The country where the product is made"
    })
    country: string;

    @ApiProperty({
        example: 1,
        description: "The unique ID of the product"
    })
    productId: number;
}
