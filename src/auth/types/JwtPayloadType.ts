import { UserRoleType } from 'src/users/types/UserRoleType';

export interface JwtPayloadType {
  sub: string;
  aud: UserRoleType;
}
