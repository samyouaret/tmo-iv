import { Injectable, UnauthorizedException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UserRoleType } from 'src/users/types/UserRoleType';
import { UserType } from 'src/users/types/UserType';
import * as bcrypt from 'bcrypt';
import { INVALID_CREDENTIALS } from './errors';

@Injectable()
export class UsersService {
  async verifyIdentity(
    email: string,
    password: string,
  ): Promise<UserType<string>> {
    const user = await this.findByEmail(email);
    if (user == null) {
      throw new UnauthorizedException(INVALID_CREDENTIALS);
    }
    await this.ensurePasswordMatch(user, password);

    return user;
  }

  async findByEmail(email: string): Promise<UserType<string>> {
    return {
      email: email,
      password: '$2b$10$HhdyTxLlghypibz21hgnhezF6hJ2ng4IFAhvG5Nw.UDlMZMnJjR0W',
      firstName: 'Dom',
      lastName: 'Brocks',
      id: randomUUID(),
      role: UserRoleType.GUEST,
    };
  }

  private async ensurePasswordMatch(user: UserType<string>, password: string) {
    if ((await bcrypt.compare(password, user?.password)) === false) {
      throw new UnauthorizedException(INVALID_CREDENTIALS);
    }
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
