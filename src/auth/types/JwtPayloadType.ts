import { UserRoleType } from '../../users/types/UserRoleType';

export interface JwtPayloadType {
  sub: string;
  aud: UserRoleType;
}
