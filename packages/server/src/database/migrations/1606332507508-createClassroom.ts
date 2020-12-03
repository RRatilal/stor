import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createClassroom1606332507508 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'classroom',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'subject',
                    type: 'varchar'
                },
                {
                    name: 'cost',
                    type: 'integer'
                },
                {
                    name: 'user_id',
                    type: 'uuid'
                },
            ],
            foreignKeys: [
                {
                    name: 'ClassroomUser',
                    columnNames: ['user_id'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('classroom')
    }

}
