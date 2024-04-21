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
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import {
  MEDIA_TYPES,
  UseFileUpload,
} from '../common/storage/upload.interceptor';
import { UpdateProductDto } from './dtos/update-product.dto';
import { PageDto } from '../common/pagination/PageDto';
import { Product } from './entities/product.entity';
import { ApiPaginatedResponse } from '../common/pagination/ApiPaginatedResponse';
import { ProductFilterDto } from './dtos/product-filter.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiExtraModels,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/authorization/guards/Role.guard';
import { setRoles } from 'src/auth/authorization/setRoles';
import { UserRoleType } from 'src/users/types/UserRoleType';

@Controller('products')
@ApiExtraModels(Product)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiResponse({
    status: 200,
    description: 'The newly created product',
    type: Product,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @UseFileUpload('image')
  @Post()
  @setRoles(UserRoleType.OWNER)
  @UseGuards(AuthGuard, RolesGuard)
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

  @UseFileUpload('image')
  @ApiResponse({
    status: 200,
    description: 'The updated product',
    type: Product,
  })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @setRoles(UserRoleType.OWNER)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
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

  @ApiResponse({
    status: 200,
    description: 'Success when product is deleted',
  })
  @ApiBearerAuth()
  @setRoles(UserRoleType.OWNER)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
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
