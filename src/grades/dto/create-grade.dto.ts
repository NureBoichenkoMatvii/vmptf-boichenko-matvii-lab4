import { IsString, IsInt } from 'class-validator';

export class CreateGradeDto {
    @IsString()
    readonly grade: string;

    @IsInt()
    readonly studentId: number;

    @IsInt()
    readonly classId: number;
}
