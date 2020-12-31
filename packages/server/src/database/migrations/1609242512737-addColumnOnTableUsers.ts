import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnOnTableUsers1609242512737 implements MigrationInterface {
    name = 'addColumnOnTableUsers1609242512737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "ScheduleClassroom"`);
        await queryRunner.query(`ALTER TABLE "classroom" DROP CONSTRAINT "ClassroomUser"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "resetToken" character varying`);
        await queryRunner.query(`ALTER TABLE "schedules" ALTER COLUMN "classroom_id" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "schedules"."classroom_id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "classroom" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "classroom"."user_id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_2550dec6f88d85584fdbc2b08df" FOREIGN KEY ("classroom_id") REFERENCES "classroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classroom" ADD CONSTRAINT "FK_bd4f583128824616118fd7f2998" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classroom" DROP CONSTRAINT "FK_bd4f583128824616118fd7f2998"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_2550dec6f88d85584fdbc2b08df"`);
        await queryRunner.query(`COMMENT ON COLUMN "classroom"."user_id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "classroom" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "schedules"."classroom_id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "schedules" ALTER COLUMN "classroom_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "resetToken"`);
        await queryRunner.query(`ALTER TABLE "classroom" ADD CONSTRAINT "ClassroomUser" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "ScheduleClassroom" FOREIGN KEY ("classroom_id") REFERENCES "classroom"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
