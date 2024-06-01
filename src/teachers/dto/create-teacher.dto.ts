import { IsString, IsEmail } from 'class-validator';

export class CreateTeacherDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly department: string;

    @IsEmail()
    readonly email: string;
}
