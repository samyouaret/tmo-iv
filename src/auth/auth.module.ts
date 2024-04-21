import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [AuthService, JwtService, ConfigService],
  controllers: [AuthController],
  imports: [UsersModule, ConfigModule],
  exports: [AuthService, JwtService, ConfigService],
})
export class AuthModule {}
