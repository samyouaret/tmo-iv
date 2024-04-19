import { UserRoleType } from './UserRoleType';

export interface UserType {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRoleType;
}
