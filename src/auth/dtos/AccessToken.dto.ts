import { ApiProperty } from '@nestjs/swagger';
import { AccessTokenType } from '../types/AccessTokenType';

export class AccessTokenDto implements AccessTokenType {
  @ApiProperty()
  access_token: string;
}
