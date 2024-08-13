import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      name: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: process.env.DB_SSL,
      logging: process.env.DB_LOGGING,
    },
    port: parseInt(process.env.PORT, 10),
    tz: process.env.TZ,
  };
});
