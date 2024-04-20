import { PasswordHash } from '../../common/passwordHash';
import { UserRoleType } from '../../users/types/UserRoleType';

export const createOwner = async () => {
  return {
    firstName: 'admin',
    lastName: 'admin',
    email: 'admin@tmo-mailer.com',
    password: await PasswordHash.hash('admin'),
    role: UserRoleType.OWNER,
  };
};
