import { MigrationInterface, QueryRunner } from 'typeorm';

export class ItmSd1702657637731 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `insert into "item" (title, detail, price, image_url, is_ebook) 
                  values ('sample book', 'this is sample book', 30, 'url-of-image', false), ('sample ebook', 'this is sample ebook', 20, 'url-of-image', true); `,
    );
    // await queryRunner.query(
    //   `insert into "purchase" ("userId", "itemId") values (2, 1)`,
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
