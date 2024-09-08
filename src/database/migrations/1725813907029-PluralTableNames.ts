import { MigrationInterface, QueryRunner } from 'typeorm';

export class PluralTableNames1725813907029 implements MigrationInterface {
  name = 'PluralTableNames1725813907029';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "brand" RENAME TO "brands"`);
    await queryRunner.query(`ALTER TABLE "order" RENAME TO "orders"`);
    await queryRunner.query(
      `ALTER TABLE "order_product" RENAME TO "order_products"`,
    );
    await queryRunner.query(`ALTER TABLE "category" RENAME TO "categories"`);
    await queryRunner.query(`ALTER TABLE "product" RENAME TO "products"`);
    await queryRunner.query(`ALTER TABLE "customer" RENAME TO "customers"`);
    await queryRunner.query(`ALTER TABLE "user" RENAME TO "users"`);
    await queryRunner.query(
      `ALTER TABLE "category_products_product" RENAME TO "categories_products"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categories_products" RENAME TO "category_products_product"`,
    );
    await queryRunner.query(`ALTER TABLE "users" RENAME TO "user"`);
    await queryRunner.query(`ALTER TABLE "customers" RENAME TO "customer"`);
    await queryRunner.query(`ALTER TABLE "products" RENAME TO "product"`);
    await queryRunner.query(`ALTER TABLE "categories" RENAME TO "category"`);
    await queryRunner.query(
      `ALTER TABLE "order_products" RENAME TO "order_product"`,
    );
    await queryRunner.query(`ALTER TABLE "orders" RENAME TO "order"`);
    await queryRunner.query(`ALTER TABLE "brands" RENAME TO "brand"`);
  }
}
