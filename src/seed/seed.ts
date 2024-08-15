import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SeedModule } from './seed.module';
import { SeedService } from './seed.service';

async function bootstrap() {
  const logger = new Logger('SeedBootstrap');
  const appContext = await NestFactory.createApplicationContext(SeedModule);

  try {
    const seedService = appContext.get(SeedService);
    logger.log('Starting the seeding process...');

    await seedService.runSeed();

    logger.log('Seeding completed successfully!');
  } catch (error) {
    logger.error('Seeding failed', error.stack);
    process.exit(1);
  } finally {
    await appContext.close();
    logger.log('Application context closed.');
  }
}

bootstrap();
