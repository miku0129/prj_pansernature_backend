import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seeding1702631714543 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `insert into "membership" (end_date)
      select NOW()::date + integer '365'
      where exists (select * from "user" where id = 14)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
