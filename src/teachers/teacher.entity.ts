import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Class } from '../classes/class.entity';

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    department: string;

    @Column({ unique: true })
    email: string;

    // @Column()
    // password: string;

    @OneToMany(() => Class, _class => _class.teacher)
    classes: Class[];
}
