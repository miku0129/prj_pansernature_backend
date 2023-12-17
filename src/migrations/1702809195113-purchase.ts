import { MigrationInterface, QueryRunner } from 'typeorm';

export class Purchase1702809195113 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `insert into "purchase" ("userId", "itemId") values (2, 8)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
