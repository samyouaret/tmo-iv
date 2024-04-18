import { Injectable } from '@nestjs/common';
import { AccessTokenType } from './types/AccessTokenType';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadType } from './types/JwtPayloadType';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async login(email: string, password: string): Promise<AccessTokenType> {
    const user = await this.usersService.verifyIdentity(email, password);
    const payload: JwtPayloadType = { sub: user.id, aud: user.role };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: '15m',
      }),
    };
  }
}
