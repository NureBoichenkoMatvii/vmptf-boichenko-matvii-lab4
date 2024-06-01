import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from '../students/student.entity';
import { Class } from '../classes/class.entity';

@Entity()
export class Grade {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Student, student => student.grades)
    student: Student;

    @ManyToOne(() => Class, _class => _class.grades)
    class: Class;

    @Column()
    grade: string;
}
