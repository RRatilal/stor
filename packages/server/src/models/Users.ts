import { Column, Entity, Generated, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Classroom from './Classroom'

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column()
    surname!: string;

    @Column()
    password!: string;

    @Column()
    email!: string;

    @Column()
    whatsapp!: string;

    @Column()
    bio!: string;

    @OneToMany(() => Classroom, classroom => classroom.user, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'user_id'})
    classrooms!: Classroom[]
}