import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAllTables1702845604109 implements MigrationInterface {
  name = 'CreateAllTables1702845604109';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "membership" ("id" SERIAL NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "end_date" date NOT NULL, "is_valid" boolean NOT NULL DEFAULT true, "userId" integer, CONSTRAINT "PK_83c1afebef3059472e7c37e8de8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(30) NOT NULL, "firstname" character varying(30) NOT NULL, "address" character varying(100) NOT NULL, "postalcode" character varying(20) NOT NULL, "email" character varying(50) NOT NULL, "is_valid" boolean NOT NULL DEFAULT true, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "purchase" ("id" SERIAL NOT NULL, "purchased_date" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "itemId" integer, CONSTRAINT "PK_86cc2ebeb9e17fc9c0774b05f69" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "item" ("id" SERIAL NOT NULL, "title" character varying(50) NOT NULL, "detail" character varying(500), "price" integer NOT NULL, "image_url" character varying(100), "is_ebook" boolean NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "membership" ADD CONSTRAINT "FK_eef2d9d9c70cd13bed868afedf4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase" ADD CONSTRAINT "FK_33520b6c46e1b3971c0a649d38b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase" ADD CONSTRAINT "FK_859729cff68dea71a165722f4cb" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "purchase" DROP CONSTRAINT "FK_859729cff68dea71a165722f4cb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase" DROP CONSTRAINT "FK_33520b6c46e1b3971c0a649d38b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "membership" DROP CONSTRAINT "FK_eef2d9d9c70cd13bed868afedf4"`,
    );
    await queryRunner.query(`DROP TABLE "item"`);
    await queryRunner.query(`DROP TABLE "purchase"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "membership"`);
  }
}
