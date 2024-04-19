import { Module } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductsService],
})
export class ProductsModule {}
