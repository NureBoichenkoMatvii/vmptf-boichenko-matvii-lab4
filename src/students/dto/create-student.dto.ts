import { IsEmail, IsInt, IsString, Min } from 'class-validator';

export class CreateStudentDto {
    @IsString()
    readonly name: string;

    @IsInt()
    @Min(1)
    readonly age: number;

    @IsEmail()
    readonly email: string;
}
