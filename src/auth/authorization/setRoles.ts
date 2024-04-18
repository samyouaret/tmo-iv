import { SetMetadata } from '@nestjs/common';
import { UserRoleType } from '../../users/types/UserRoleType';
import { ROLES_KEY } from './constants';

export const setRoles = (...roles: UserRoleType[]) =>
  SetMetadata(ROLES_KEY, roles);
