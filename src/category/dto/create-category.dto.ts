import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
  @ApiProperty({
    example: "Clothes",
    description: "The name Category"
  })
  name: string;
}
