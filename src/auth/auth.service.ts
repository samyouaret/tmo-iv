import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AccessTokenType } from './types/AccessTokenType';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadType } from './types/JwtPayloadType';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async login(email: string, password: string): Promise<AccessTokenType> {
    const user = await this.usersService.verifyIdentity(email, password);
    const payload: JwtPayloadType = { sub: user.id, aud: user.role };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
