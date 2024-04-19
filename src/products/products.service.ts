import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';

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
}
