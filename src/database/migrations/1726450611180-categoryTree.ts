import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoryTree1726450611180 implements MigrationInterface {
    name = 'CategoryTree1726450611180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d72eb2a5bbff4f2533a5d4caff9"`);
        await queryRunner.query(`ALTER TABLE "order_products" DROP CONSTRAINT "FK_ea143999ecfa6a152f2202895e2"`);
        await queryRunner.query(`ALTER TABLE "order_products" DROP CONSTRAINT "FK_400f1584bf37c21172da3b15e2d"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_2eb5ce4324613b4b457c364f4a2"`);
        await queryRunner.query(`ALTER TABLE "categories_products" DROP CONSTRAINT "FK_8d7c51e7e113812de685d88df3b"`);
        await queryRunner.query(`ALTER TABLE "categories_products" DROP CONSTRAINT "FK_3071808e19df360b703fc6ee1d4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8d7c51e7e113812de685d88df3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3071808e19df360b703fc6ee1d"`);
        await queryRunner.query(`CREATE TABLE "categories_closure" ("id_ancestor" uuid NOT NULL, "id_descendant" uuid NOT NULL, CONSTRAINT "PK_dc67f6a82852c15ec6e4243398d" PRIMARY KEY ("id_ancestor", "id_descendant"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ea1e9c4eea91160dfdb4318778" ON "categories_closure" ("id_ancestor") `);
        await queryRunner.query(`CREATE INDEX "IDX_51fff5114cc41723e8ca36cf22" ON "categories_closure" ("id_descendant") `);
        await queryRunner.query(`ALTER TABLE "categories_products" DROP CONSTRAINT "PK_320da76c18b122a764e59efca59"`);
        await queryRunner.query(`ALTER TABLE "categories_products" ADD CONSTRAINT "PK_320da76c18b122a764e59efca59" PRIMARY KEY ("product_id")`);
        await queryRunner.query(`ALTER TABLE "categories_products" DROP COLUMN "category_id"`);
        await queryRunner.query(`ALTER TABLE "categories_products" DROP CONSTRAINT "PK_320da76c18b122a764e59efca59"`);
        await queryRunner.query(`ALTER TABLE "categories_products" DROP COLUMN "product_id"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "parent_category_id" uuid`);
        await queryRunner.query(`ALTER TABLE "categories_products" ADD "categories_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categories_products" ADD CONSTRAINT "PK_4e2982ffa196d59968b25cafc1b" PRIMARY KEY ("categories_id")`);
        await queryRunner.query(`ALTER TABLE "categories_products" ADD "products_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categories_products" DROP CONSTRAINT "PK_4e2982ffa196d59968b25cafc1b"`);
        await queryRunner.query(`ALTER TABLE "categories_products" ADD CONSTRAINT "PK_607c35387f1851fa82a5ae4c74f" PRIMARY KEY ("categories_id", "products_id")`);
        await queryRunner.query(`ALTER TYPE "public"."user_role_enum" RENAME TO "user_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'customer', 'seller')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum" USING "role"::"text"::"public"."users_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "brands" ADD CONSTRAINT "UQ_96db6bbbaa6f23cad26871339b6" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TYPE "public"."order_status_enum" RENAME TO "order_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."orders_status_enum" AS ENUM('PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED')`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "status" TYPE "public"."orders_status_enum" USING "status"::"text"::"public"."orders_status_enum"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'PENDING'`);
        await queryRunner.query(`DROP TYPE "public"."order_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name")`);
        await queryRunner.query(`CREATE INDEX "IDX_4e2982ffa196d59968b25cafc1" ON "categories_products" ("categories_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_70f14b6e18efa2cf83a7561d1e" ON "categories_products" ("products_id") `);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_c7bc1ffb56c570f42053fa7503b" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD CONSTRAINT "FK_f258ce2f670b34b38630914cf9e" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD CONSTRAINT "FK_2d58e8bd11dc840b39f99824d84" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_de08738901be6b34d2824a1e243" FOREIGN KEY ("parent_category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_1530a6f15d3c79d1b70be98f2be" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories_products" ADD CONSTRAINT "FK_4e2982ffa196d59968b25cafc1b" FOREIGN KEY ("categories_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "categories_products" ADD CONSTRAINT "FK_70f14b6e18efa2cf83a7561d1e8" FOREIGN KEY ("products_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories_closure" ADD CONSTRAINT "FK_ea1e9c4eea91160dfdb4318778d" FOREIGN KEY ("id_ancestor") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories_closure" ADD CONSTRAINT "FK_51fff5114cc41723e8ca36cf227" FOREIGN KEY ("id_descendant") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories_closure" DROP CONSTRAINT "FK_51fff5114cc41723e8ca36cf227"`);
        await queryRunner.query(`ALTER TABLE "categories_closure" DROP CONSTRAINT "FK_ea1e9c4eea91160dfdb4318778d"`);
        await queryRunner.query(`ALTER TABLE "categories_products" DROP CONSTRAINT "FK_70f14b6e18efa2cf83a7561d1e8"`);
        await queryRunner.query(`ALTER TABLE "categories_products" DROP CONSTRAINT "FK_4e2982ffa196d59968b25cafc1b"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_1530a6f15d3c79d1b70be98f2be"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_de08738901be6b34d2824a1e243"`);
        await queryRunner.query(`ALTER TABLE "order_products" DROP CONSTRAINT "FK_2d58e8bd11dc840b39f99824d84"`);
        await queryRunner.query(`ALTER TABLE "order_products" DROP CONSTRAINT "FK_f258ce2f670b34b38630914cf9e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_c7bc1ffb56c570f42053fa7503b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_70f14b6e18efa2cf83a7561d1e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4e2982ffa196d59968b25cafc1"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878"`);
        await queryRunner.query(`CREATE TYPE "public"."order_status_enum_old" AS ENUM('PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED')`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "status" TYPE "public"."order_status_enum_old" USING "status"::"text"::"public"."order_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'PENDING'`);
        await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."order_status_enum_old" RENAME TO "order_status_enum"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP CONSTRAINT "UQ_96db6bbbaa6f23cad26871339b6"`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum_old" AS ENUM('admin', 'customer', 'seller')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."user_role_enum_old" USING "role"::"text"::"public"."user_role_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_role_enum_old" RENAME TO "user_role_enum"`);
        await queryRunner.query(`ALTER TABLE "categories_products" DROP CONSTRAINT "PK_607c35387f1851fa82a5ae4c74f"`);
        await queryRunner.query(`ALTER TABLE "categories_products" ADD CONSTRAINT "PK_4e2982ffa196d59968b25cafc1b" PRIMARY KEY ("categories_id")`);
        await queryRunner.query(`ALTER TABLE "categories_products" DROP COLUMN "products_id"`);
        await queryRunner.query(`ALTER TABLE "categories_products" DROP CONSTRAINT "PK_4e2982ffa196d59968b25cafc1b"`);
        await queryRunner.query(`ALTER TABLE "categories_products" DROP COLUMN "categories_id"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "parent_category_id"`);
        await queryRunner.query(`ALTER TABLE "categories_products" ADD "product_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categories_products" ADD CONSTRAINT "PK_320da76c18b122a764e59efca59" PRIMARY KEY ("product_id")`);
        await queryRunner.query(`ALTER TABLE "categories_products" ADD "category_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categories_products" DROP CONSTRAINT "PK_320da76c18b122a764e59efca59"`);
        await queryRunner.query(`ALTER TABLE "categories_products" ADD CONSTRAINT "PK_320da76c18b122a764e59efca59" PRIMARY KEY ("category_id", "product_id")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_51fff5114cc41723e8ca36cf22"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ea1e9c4eea91160dfdb4318778"`);
        await queryRunner.query(`DROP TABLE "categories_closure"`);
        await queryRunner.query(`CREATE INDEX "IDX_3071808e19df360b703fc6ee1d" ON "categories_products" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_8d7c51e7e113812de685d88df3" ON "categories_products" ("category_id") `);
        await queryRunner.query(`ALTER TABLE "categories_products" ADD CONSTRAINT "FK_3071808e19df360b703fc6ee1d4" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories_products" ADD CONSTRAINT "FK_8d7c51e7e113812de685d88df3b" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_2eb5ce4324613b4b457c364f4a2" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD CONSTRAINT "FK_400f1584bf37c21172da3b15e2d" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD CONSTRAINT "FK_ea143999ecfa6a152f2202895e2" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_d72eb2a5bbff4f2533a5d4caff9" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
