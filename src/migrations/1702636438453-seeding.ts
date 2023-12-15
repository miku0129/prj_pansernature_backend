import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seeding1702636438453 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `delete from membership
            where id = 1`,
    );
    await queryRunner.query(
      `insert into "membership" ("end_date", "userId")
                                select NOW()::date + integer '365',2 
                                where exists (select * from "user" where id = 2)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
