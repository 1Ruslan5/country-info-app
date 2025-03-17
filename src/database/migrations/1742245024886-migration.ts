import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1742245024886 implements MigrationInterface {
    name = 'Migration1742245024886'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "holiday_events" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "countryCode" character varying NOT NULL, "holidayName" character varying NOT NULL, "date" date NOT NULL, "userId" uuid, CONSTRAINT "PK_dda162f502dabaf0cfb3d8dba75" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "holiday_events" ADD CONSTRAINT "FK_d66798a23038ed3a86447c3a2ab" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "holiday_events" DROP CONSTRAINT "FK_d66798a23038ed3a86447c3a2ab"`);
        await queryRunner.query(`DROP TABLE "holiday_events"`);
    }

}
