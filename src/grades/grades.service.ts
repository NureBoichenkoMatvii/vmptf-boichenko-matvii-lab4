import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { Grade } from './grade.entity';

@Injectable()
export class GradesService {
  constructor(
      @InjectRepository(Grade)
      private gradesRepository: Repository<Grade>,
  ) {}

  create(createGradeDto: CreateGradeDto) {
    const grade = this.gradesRepository.create(createGradeDto);
    return this.gradesRepository.save(grade);
  }

  findAll() {
    return this.gradesRepository.find({ relations: ['student', 'class'] });
  }

  findOne(id: number) {
    return this.gradesRepository.findOne({ where: {id}, relations: ['student', 'class'] });
  }

  async update(id: number, updateGradeDto: UpdateGradeDto) {
    const queryRunner = this.gradesRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      await this.gradesRepository.update(id, updateGradeDto);
      await queryRunner.commitTransaction();
      return this.gradesRepository.findOne({ where: {id}, relations: ['student', 'class'] });
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number) {
    const queryRunner = this.gradesRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      await this.gradesRepository.delete(id);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
