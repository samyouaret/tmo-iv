import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoleType } from '../types/UserRoleType';
import { UserType } from '../types/UserType';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User implements UserType {
  @ApiProperty({
    example: 101,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Sam',
  })
  @Column()
  firstName: string;

  @ApiProperty({
    example: 'Ouaret',
  })
  @Column()
  lastName: string;

  @ApiProperty({
    example: 'sam@gmail.com',
  })
  @Column()
  email: string;

  @Column()
  password: string;

  @ApiProperty({ enum: UserRoleType, default: UserRoleType.GUEST })
  @Column({ type: 'enum', enum: UserRoleType, default: UserRoleType.GUEST })
  role: UserRoleType;
}
