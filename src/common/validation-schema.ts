import * as Joi from 'joi';

export default Joi.object({
  POSTGRES_HOST: Joi.string().hostname().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_SSL: Joi.boolean().required(),
  PORT: Joi.number().required(),
  PGADMIN_DEFAULT_EMAIL: Joi.string().required(),
  PGADMIN_DEFAULT_PASSWORD: Joi.string().required(),
});
