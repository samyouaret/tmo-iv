import {
  Controller,
  UploadedFile,
  Body,
  Post,
  Param,
  Patch,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  FileTypeValidator,
  ParseFilePipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { MEDIA_TYPES, UseFileUpload } from './interceptors/upload.interceptor';
import { UpdateProductDto } from './dtos/update-product.dto';
import { PageDto } from 'src/common/pagination/PageDto';
import { Product } from './entities/product.entity';
import { ApiPaginatedResponse } from 'src/common/pagination/ApiPaginatedResponse';
import { ProductFilterDto } from './dtos/product-filter.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiExtraModels,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('products')
@ApiExtraModels(Product)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'The newly created product',
    type: Product,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @UseFileUpload('image')
  async create(
    @Body() data: CreateProductDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: MEDIA_TYPES.IMAGE })],
      }),
    )
    file,
  ): Promise<Product> {
    return this.productsService.create({
      ...data,
      image: file.path,
    });
  }

  @Patch(':id')
  @UseFileUpload('image')
  @ApiResponse({
    status: 200,
    description: 'The updated product',
    type: Product,
  })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateProductDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: MEDIA_TYPES.IMAGE })],
      }),
    )
    file,
  ): Promise<Product> {
    return this.productsService.update(id, {
      ...data,
      image: file.path,
    });
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Success when product is deleted',
  })
  @ApiBearerAuth()
  async delete(@Param('id') id: number): Promise<void> {
    return this.productsService.delete(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiPaginatedResponse(Product)
  async getProducts(
    @Query() pageOptionsDto: ProductFilterDto,
  ): Promise<PageDto<Product>> {
    return this.productsService.getProducts(pageOptionsDto);
  }
}
