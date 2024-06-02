import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {StudentsModule} from './students/students.module';
import {TeachersModule} from './teachers/teachers.module';
import {CoursesModule} from './courses/courses.module';
import {ClassesModule} from './classes/classes.module';
import {GradesModule} from './grades/grades.module';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {APP_INTERCEPTOR} from "@nestjs/core";
import {CacheInterceptor, CacheModule} from "@nestjs/cache-manager";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        CacheModule.register({
            isGlobal: true,
            ttl: 5, // seconds
            max: 10, // maximum number of items in cache
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DB_HOST', 'localhost'),
                port: +configService.get<number>('DB_PORT', 5432),
                username: configService.get('DB_USERNAME', 'postgres'),
                password: configService.get('DB_PASSWORD', 'postgres'),
                database: configService.get('DB_NAME', 'postgres'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
        StudentsModule,
        TeachersModule,
        CoursesModule,
        ClassesModule,
        GradesModule,
        AuthModule,
        UsersModule,
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
        },
    ],
})
export class AppModule {
}
