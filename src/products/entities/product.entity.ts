import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ColumnDecimalTransformer } from './ColumnDecimalTransformer';

@Entity()
export class Product {
  @ApiProperty({
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column('decimal', {
    scale: 2,
    transformer: new ColumnDecimalTransformer(),
  })
  price: number;

  @ApiProperty()
  @Column()
  category: string;

  @ApiProperty()
  @Column()
  image: string;
}
