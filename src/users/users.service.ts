import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserType } from 'src/users/types/UserType';
import { INVALID_CREDENTIALS, USER_ALREADY_EXISTS } from './errors';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordHash } from '../common/passwordHash';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(input: Omit<UserType, 'id'>): Promise<UserType> {
    await this.ensureUserNotExists(input.email);
    const newUser = this.usersRepository.create(input);
    newUser.password = await PasswordHash.hash(input.password);

    await this.usersRepository.save(newUser);
    delete newUser.password;

    return newUser;
  }

  private async ensureUserNotExists(email: string) {
    const user = await this.findByEmail(email);
    if (user != null) {
      throw new BadRequestException(USER_ALREADY_EXISTS);
    }
  }

  async verifyIdentity(email: string, password: string): Promise<UserType> {
    const user = await this.findByEmail(email);
    if (user == null) {
      throw new UnauthorizedException(INVALID_CREDENTIALS);
    }
    await this.ensurePasswordMatch(user, password);

    return user;
  }

  async findByEmail(email: string): Promise<UserType | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  private async ensurePasswordMatch(user: UserType, password: string) {
    if ((await PasswordHash.match(password, user?.password)) === false) {
      throw new UnauthorizedException(INVALID_CREDENTIALS);
    }
  }
}
