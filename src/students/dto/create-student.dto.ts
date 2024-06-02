import { IsEmail, IsInt, IsString, Min } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(1)
  age: number;

  @IsEmail()
  email: string;
}
