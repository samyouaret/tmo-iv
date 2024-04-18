import { UserRoleType } from './UserRoleType';

export interface UserType<ID> {
  id: ID;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRoleType;
}
