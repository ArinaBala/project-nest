import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnDescription1790678274583 implements MigrationInterface {
    name = 'AddColumnDescription1790678274583'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" ADD "description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "description"`);
    }

}
