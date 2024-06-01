import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Grade} from '../grades/grade.entity';

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column({unique: true})
    email: string;

    @OneToMany(() => Grade, grade => grade.student)
    grades: Grade[];
}
