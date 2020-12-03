import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import User from './Users';
import Schedules from './Schedules';

@Entity('classroom')
export default class Classroom {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid')
    id!: string;

    @Column()
    subject!: string;

    @Column()
    cost!: number;

    @ManyToOne(() => User, user => user.classrooms)
    @JoinColumn({name: 'user_id'})
    user!: User;

    @OneToMany(() => Schedules, schedules => schedules.classroom, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'classroom_id'})
    schedules!: Schedules[]
}