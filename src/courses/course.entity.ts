import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Class} from '../classes/class.entity';

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(() => Class, _class => _class.course)
    classes: Class[];
}
