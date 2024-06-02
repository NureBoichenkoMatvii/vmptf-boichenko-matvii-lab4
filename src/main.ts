import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from "@nestjs/common";
import helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}),
  );
  // app.use(express.json({ limit: '10mb' }));

  const config = new DocumentBuilder()
    .setTitle('University Management API')
    .setDescription('API documentation for the University Management system')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    }, )
    .addServer('http://localhost:3001', 'Development server')
    .addServer('http://localhost:3000', 'Docker server')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}

bootstrap();
