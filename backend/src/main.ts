import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 'forbidNonWhitelisted: true':
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Ignore data that doesn't exist in the DTO
      forbidNonWhitelisted: true, // Throws an error if any non-whitelisted properties are present in the payload
      //disableErrorMessages: true,       // Disable error messages (production)
    }),
  );
  await app.listen(3000);
}
bootstrap();
