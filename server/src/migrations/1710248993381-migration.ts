import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1710248993381 implements MigrationInterface {
    name = 'migration1710248993381'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "room" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "reference" character varying,
                "label" character varying NOT NULL,
                "meta" jsonb,
                CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "device" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "type" character varying NOT NULL,
                "room_id" uuid NOT NULL,
                "label" character varying NOT NULL,
                "protocol" character varying NOT NULL,
                "uri" character varying NOT NULL,
                "api_key" character varying,
                "meta" jsonb,
                CONSTRAINT "PK_2dc10972aa4e27c01378dad2c72" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "measure" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "device_id" uuid NOT NULL,
                "type" character varying NOT NULL,
                "value" double precision NOT NULL,
                "meta" jsonb,
                CONSTRAINT "PK_ddc1ad2a86717cedc808809423e" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "device"
            ADD CONSTRAINT "FK_5c03ea8368b4c25f1810d31fa0b" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "measure"
            ADD CONSTRAINT "FK_61fc34b55360125eb3d005f41b8" FOREIGN KEY ("device_id") REFERENCES "device"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "measure" DROP CONSTRAINT "FK_61fc34b55360125eb3d005f41b8"
        `);
        await queryRunner.query(`
            ALTER TABLE "device" DROP CONSTRAINT "FK_5c03ea8368b4c25f1810d31fa0b"
        `);
        await queryRunner.query(`
            DROP TABLE "measure"
        `);
        await queryRunner.query(`
            DROP TABLE "device"
        `);
        await queryRunner.query(`
            DROP TABLE "room"
        `);
    }

}
