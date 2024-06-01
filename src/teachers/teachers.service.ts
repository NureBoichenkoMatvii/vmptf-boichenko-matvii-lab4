import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './teacher.entity';

@Injectable()
export class TeachersService {
  constructor(
      @InjectRepository(Teacher)
      private teachersRepository: Repository<Teacher>,
  ) {}

  create(createTeacherDto: CreateTeacherDto) {
    const teacher = this.teachersRepository.create(createTeacherDto);
    return this.teachersRepository.save(teacher);
  }

  findAll() {
    return this.teachersRepository.find();
  }

  findOne(id: number) {
    return this.teachersRepository.findOneBy({id});
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    const queryRunner = this.teachersRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      await this.teachersRepository.update(id, updateTeacherDto);
      await queryRunner.commitTransaction();
      return this.teachersRepository.findOneBy({id});
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number) {
    const queryRunner = this.teachersRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      await this.teachersRepository.delete(id);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  findOneByEmail(email: string): Promise<Teacher> {
    return this.teachersRepository.findOneBy({ email });
  }
}
