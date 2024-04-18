import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UserRoleType } from 'src/users/types/UserRoleType';
import { UserType } from 'src/users/types/UserType';

@Injectable()
export class UsersService {
  async findByEmail(email: string): Promise<UserType<string>> {
    return {
      email: email,
      password: '123456',
      firstName: 'Dom',
      lastName: 'Brocks',
      id: randomUUID(),
      role: UserRoleType.GUEST,
    };
  }

  async findByID(id: string): Promise<UserType<string>> {
    return {
      email: 'dombrocks@mail.com',
      password: '123456',
      firstName: 'Dom',
      lastName: 'Brocks',
      id,
      role: UserRoleType.GUEST,
    };
  }
}
