import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 'whitelist: true' Automatically removes properties that don't have any decorators in the DTO
  // 'forbidNonWhitelisted: true': Throws an error if any non-whitelisted properties are present in the payload
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  await app.listen(3000);
}
bootstrap();