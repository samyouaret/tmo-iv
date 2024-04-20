import { User } from 'src/users/entities/users.entity';
import { UserRoleType } from 'src/users/types/UserRoleType';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { createOwner } from '../seeds/owner-user';

export class Seed1713635149175 implements MigrationInterface {
  name = 'Seed1713635149175';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const manager = queryRunner.manager;
    const owner = manager.create(User);
    Object.assign(owner, await createOwner());
    await manager.save(owner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const manager = queryRunner.manager;
    await manager.delete(User, { role: UserRoleType.OWNER });
  }
}
