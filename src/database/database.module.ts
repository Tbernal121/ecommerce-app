import { Global, Module } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from '../common/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get<ConfigType<typeof config>>('config');
        return {
          type: 'postgres',
          host: dbConfig.database.host,
          port: dbConfig.database.port,
          username: dbConfig.database.user,
          password: dbConfig.database.password,
          database: dbConfig.database.name,
          ssl:
            dbConfig.database.ssl === 'true'
              ? { rejectUnauthorized: false }
              : false,
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true, // Disable this in production for better control over migrations
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
