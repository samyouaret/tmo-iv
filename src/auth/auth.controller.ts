import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dtos/UserLogin.dto';
import { AccessTokenDto } from './dtos/AccessToken.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'Sign in with email and password',
    type: AccessTokenDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid credentials' })
  login(@Body() input: UserLoginDto) {
    return this.authService.login(input.email, input.password);
  }
}
