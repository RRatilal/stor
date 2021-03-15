import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImage1614261689427 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'images',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'gen_random_uuid()'
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'url',
                    type: 'varchar'
                },
                {
                    name: 'user_id',
                    type: 'uuid'
                },
            ],
            foreignKeys: [
                {
                    name: 'ImageUser',
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
        await queryRunner.dropTable('images')
    }

}
