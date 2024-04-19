import { UserRoleType } from '../../users/types/UserRoleType';

export interface JwtPayloadType {
  sub: number;
  aud: UserRoleType;
}
