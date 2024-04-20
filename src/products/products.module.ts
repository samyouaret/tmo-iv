import { Module } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { FileStorage } from '../common/storage/FileStorage';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductsService, FileStorage],
  controllers: [ProductsController],
})
export class ProductsModule {}
