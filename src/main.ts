import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigType } from '@nestjs/config';

import { AppModule } from './app.module';
import config from './common/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const configService = app.get<ConfigType<typeof config>>(config.KEY);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Ecommerce API')
    .setDescription(
      'This is the documentation for the Ecommerce API. \n\n[View JSON](./docs-json)',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);
  app.enableCors();
  await app.listen(configService.port || 3000);
}
bootstrap();
