import { MigrationInterface, QueryRunner } from 'typeorm';

export class DbInit1713635130100 implements MigrationInterface {
  name = 'DbInit1713635130100';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('OWNER', 'GUEST')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'GUEST', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric NOT NULL, "category" character varying NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
  }
}
