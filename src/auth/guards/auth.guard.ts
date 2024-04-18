import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ROLES_KEY } from '../authorization/constants';
import { JwtPayloadType } from '../types/JwtPayloadType';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.fromAuthHeaderAsBearerToken(request);

    if (token === undefined) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.verifyToken(token, context.getHandler());
      this.populateUser(payload, request);
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }

    return true;
  }

  async verifyToken(token: string, handler: any): Promise<any> {
    const audience = this.reflector.get<string[]>(ROLES_KEY, handler);
    return this.jwtService.verifyAsync(token, {
      secret: this.configService.get('JWT_SECRET'),
      audience,
    });
  }

  private async populateUser(
    payload: JwtPayloadType,
    request: Request,
  ): Promise<void> {
    request['user'] = { id: payload.sub, role: payload.aud };
  }

  private fromAuthHeaderAsBearerToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
