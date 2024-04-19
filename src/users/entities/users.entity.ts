import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoleType } from '../types/UserRoleType';
import { UserType } from '../types/UserType';

@Entity()
export class User implements UserType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRoleType, default: UserRoleType.GUEST })
  role: UserRoleType;
}
