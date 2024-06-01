import { IsString, IsInt } from 'class-validator';

export class CreateClassDto {
    @IsString()
    readonly schedule: string;

    @IsInt()
    readonly courseId: number;

    @IsInt()
    readonly teacherId: number;
}
