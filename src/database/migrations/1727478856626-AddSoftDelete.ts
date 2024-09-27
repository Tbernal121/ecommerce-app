import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSoftDelete1727478856626 implements MigrationInterface {
    name = 'AddSoftDelete1727478856626'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "products" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "order_products" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "deleted_at"`);
    }

}
