import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './student.entity';

@Injectable()
export class StudentsService {
  constructor(
      @InjectRepository(Student)
      private studentsRepository: Repository<Student>,
  ) {}

  create(createStudentDto: CreateStudentDto) {
    const student = this.studentsRepository.create(createStudentDto);
    return this.studentsRepository.save(student);
  }

  findAll() {
    return this.studentsRepository.find();
  }

  findOne(id: number) {
    return this.studentsRepository.findOneBy({id});
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const queryRunner = this.studentsRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      await this.studentsRepository.update(id, updateStudentDto);
      await queryRunner.commitTransaction();
      return this.studentsRepository.findOneBy({id});
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number) {
    const queryRunner = this.studentsRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      await this.studentsRepository.delete(id);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
