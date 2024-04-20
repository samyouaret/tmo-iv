import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { PageMetaDto } from 'src/common/pagination/PageMetaDto';
import { PageDto } from 'src/common/pagination/PageDto';
import { ProductFilterDto } from './dtos/product-filter.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async create(input: Omit<Product, 'id'>): Promise<Product> {
    const product = this.productsRepository.create(input);

    return this.productsRepository.save(product);
  }

  async update(id: number, input: Omit<Product, 'id'>): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (product == null) {
      throw new NotFoundException();
    }
    if (product.image !== input.image) {
      //  delete image from storage
      await this.deleteImage(product.image);
    }

    Object.assign(product, input);
    return this.productsRepository.save(product);
  }

  async delete(id: number): Promise<void> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (product == null) {
      throw new NotFoundException();
    }

    await this.deleteImage(product.image);
    await this.productsRepository.delete({ id });
  }

  async deleteImage(path: string): Promise<true | NodeJS.ErrnoException> {
    return new Promise((resolve, reject) => {
      fs.unlink(path, (err) => {
        if (err) {
          reject(err);
        }
        resolve(true);
      });
    });
  }

  public async getProducts(
    productFilter: ProductFilterDto,
  ): Promise<PageDto<Product>> {
    const queryBuilder = this.productsRepository.createQueryBuilder('product');

    queryBuilder
      .orderBy('product.price', productFilter.order)
      .skip(productFilter.skip)
      .take(productFilter.take);

    if (productFilter.category) {
      queryBuilder.where('product.category = :category', {
        category: productFilter.category,
      });
    }

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: productFilter,
    });

    return new PageDto(entities, pageMetaDto);
  }
}
