import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Samy',
    description: 'First name or given name',
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: 'Ouaret',
    description: 'last name or family name',
  })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: 'samy@gmail.com',
    description: 'User email',
  })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
