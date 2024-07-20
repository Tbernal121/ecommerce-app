import { Global, Module } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from '../common/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          type: 'postgres',
          host: configService.database.host,
          port: configService.database.port,
          username: configService.database.user,
          password: configService.database.password,
          database: configService.database.name,
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
