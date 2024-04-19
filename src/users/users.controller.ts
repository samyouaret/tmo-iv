import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UserRoleType } from './types/UserRoleType';
import { ApiResponse } from '@nestjs/swagger';
import { User } from './entities/users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 201,
    description: 'A new user is registered',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create({
      ...createUserDto,
      role: UserRoleType.GUEST,
    });
  }
}
