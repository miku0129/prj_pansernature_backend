import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropAllTables1705935317893 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "membership"`);
    await queryRunner.query(`DROP TABLE "purchase"`);
    await queryRunner.query(`DROP TABLE "item"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
