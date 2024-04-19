import {
  Controller,
  UploadedFile,
  Body,
  Post,
  Param,
  Patch,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UseFileUpload } from './interceptors/upload.interceptor';
import { UpdateProductDto } from './dtos/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseFileUpload('image')
  async create(@Body() data: CreateProductDto, @UploadedFile() file) {
    return this.productsService.create({
      ...data,
      image: file.path,
    });
  }

  @Patch(':id')
  @UseFileUpload('image')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateProductDto,
    @UploadedFile() file,
  ) {
    return this.productsService.update(id, {
      ...data,
      image: file.path,
    });
  }
}
