import { Controller, UploadedFile, Body, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UseFileUpload } from './interceptors/upload.interceptor';

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
}
