import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Iphone 14',
    description: 'The product name',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Iphone 14 with special carrier',
    description: 'some description about the product',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'samy@gmail.com',
    description: 'User email',
  })
  @IsDecimal({ decimal_digits: '0,2' })
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  category: string;
}
