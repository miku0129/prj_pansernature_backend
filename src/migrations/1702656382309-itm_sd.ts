import { MigrationInterface, QueryRunner } from 'typeorm';

export class ItmSd1702656382309 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "purchase"`);
    await queryRunner.query(`DROP TABLE "item"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
