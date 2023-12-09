import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Games API')
    .setDescription('The Games API description')
    .setVersion('1.0')
    .addTag('games')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.useGlobalFilters(new HttpExceptionFilter());
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
