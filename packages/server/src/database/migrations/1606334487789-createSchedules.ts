import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createSchedules1606334487789 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'schedules',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'week_day',
                    type: 'integer',
                },
                {
                    name: 'from',
                    type: 'integer',
                },
                {
                    name: 'to',
                    type: 'integer',
                },
                {
                    name: 'classroom_id',
                    type: 'uuid',
                },
            ],
            foreignKeys: [
                {
                    name: 'ScheduleClassroom',
                    columnNames: ['classroom_id'],
                    referencedTableName: 'classroom',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('schedules')
    }

}
