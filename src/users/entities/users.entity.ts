import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoleType } from '../types/UserRoleType';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRoleType, default: UserRoleType.GUEST })
  role: UserRoleType;
}
