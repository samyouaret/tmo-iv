import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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
}
