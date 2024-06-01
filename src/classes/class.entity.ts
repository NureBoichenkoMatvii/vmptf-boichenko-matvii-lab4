import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Course } from '../courses/course.entity';
import { Teacher } from '../teachers/teacher.entity';
import { Grade } from '../grades/grade.entity';

@Entity()
export class Class {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Course, course => course.classes)
    course: Course;

    @ManyToOne(() => Teacher, teacher => teacher.classes)
    teacher: Teacher;

    @Column()
    schedule: string;

    @OneToMany(() => Grade, grade => grade.class)
    grades: Grade[];
}
