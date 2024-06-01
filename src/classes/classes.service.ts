import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Class } from './class.entity';

@Injectable()
export class ClassesService {
  constructor(
      @InjectRepository(Class)
      private classesRepository: Repository<Class>,
  ) {}

  create(createClassDto: CreateClassDto) {
    const classEntity = this.classesRepository.create(createClassDto);
    return this.classesRepository.save(classEntity);
  }

  findAll() {
    return this.classesRepository.find({ relations: ['course', 'teacher'] });
  }

  findOne(id: number) {
    return this.classesRepository.findOne({ where: {id}, relations: ['course', 'teacher'] });
  }

  async update(id: number, updateClassDto: UpdateClassDto) {
    const queryRunner = this.classesRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      await this.classesRepository.update(id, updateClassDto);
      await queryRunner.commitTransaction();
      return this.classesRepository.findOne({ where: {id}, relations: ['course', 'teacher'] });
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number) {
    const queryRunner = this.classesRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      await this.classesRepository.delete(id);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
