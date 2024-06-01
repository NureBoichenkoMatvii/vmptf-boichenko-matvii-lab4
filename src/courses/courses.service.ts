import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './course.entity';

@Injectable()
export class CoursesService {
  constructor(
      @InjectRepository(Course)
      private coursesRepository: Repository<Course>,
  ) {}

  create(createCourseDto: CreateCourseDto) {
    const course = this.coursesRepository.create(createCourseDto);
    return this.coursesRepository.save(course);
  }

  findAll() {
    return this.coursesRepository.find({ relations: ['classes'] });
  }

  findOne(id: number) {
    return this.coursesRepository.findOne({ where: {id}, relations: ['classes'] });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const queryRunner = this.coursesRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      await this.coursesRepository.update(id, updateCourseDto);
      await queryRunner.commitTransaction();
      return this.coursesRepository.findOne({ where: {id}, relations: ['classes'] });
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number) {
    const queryRunner = this.coursesRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      await this.coursesRepository.delete(id);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
