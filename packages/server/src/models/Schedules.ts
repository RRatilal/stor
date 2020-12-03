import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Classroom from './Classroom'

@Entity('schedules')
export default class Schedule {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid')
    id!: string;

    @Column()
    week_day!: number;

    @Column()
    from!: number;

    @Column()
    to!: number;

    @ManyToOne(() => Classroom, classroom => classroom.schedules )
    @JoinColumn({name: 'classroom_id'})
    classroom!: Classroom;
}