import * as Joi from 'joi';

export default Joi.object({
  DB_HOST: Joi.string().hostname().required(),
  DB_PORT: Joi.number().required(),
  DB_NAME: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_SSL: Joi.boolean().required(),
  TZ: Joi.string().required(),
  PORT: Joi.number().required(),
  PG_ADMIN_EMAIL: Joi.string().required(),
  PG_ADMIN_PASSWORD: Joi.string().required(),
  PG_ADMIN_PORT: Joi.number().required(),
});
