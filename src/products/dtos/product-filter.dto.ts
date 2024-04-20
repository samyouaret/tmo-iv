import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PageOptionsDto } from 'src/common/pagination/PageOptionsDto';

export class ProductFilterDto extends PageOptionsDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  category: string;
}
