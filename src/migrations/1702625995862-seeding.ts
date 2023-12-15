import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seeding1702625995862 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `insert into "user" (name, firstname, address, postalcode, email) 
      values ('Alice', 'Aden', '001 AVADIN ATRANTA', '10000', 'aliceaden@sample.mail'), ('Beth', 'Benson', '002 BOULEVARD BERANGER', '20000', 'bethbenson@sample.mail'); `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
