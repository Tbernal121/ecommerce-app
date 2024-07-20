import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';

import config from '../common/config';

@Global()
@Module({
  providers: [
    {
      provide: 'PG_CLIENT',
      inject: [config.KEY],
      useFactory: async (configService: ConfigType<typeof config>) => {
        const client = new Client({
          user: configService.database.user,
          host: configService.database.host,
          database: configService.database.name,
          password: configService.database.password,
          port: configService.database.port,
        });
        await client.connect();
        return client;
      },
    },
  ],
  exports: ['PG_CLIENT'],
})
export class DatabaseModule {}
