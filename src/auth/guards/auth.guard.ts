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
      const payload = await this.verifyToken(token, context);
      this.populateUser(payload, request);
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }

    return true;
  }

  async verifyToken(token: string, context: ExecutionContext): Promise<any> {
    const audience = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    return this.jwtService.verifyAsync(token, {
      secret: this.configService.get('JWT_SECRET'),
      audience,
    });
  }

  private populateUser(payload: JwtPayloadType, request: Request): void {
    request['user'] = { id: payload.sub, role: payload.aud };
  }

  private fromAuthHeaderAsBearerToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
