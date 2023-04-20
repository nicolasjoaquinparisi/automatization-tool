import Joi from "joi";

const setupSchema = Joi.object({
  user: Joi.string().required(),
  password: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
  host: Joi.string().required(),
  password: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
  database: Joi.string().required(),
});

const insertSchema = Joi.object({
  table: Joi.string().required(),
  data: Joi.object().required().keys().min(1),
});

const updateSchema = Joi.object({
  table: Joi.string().required(),
  set: Joi.object().required(),
  where: Joi.string().required(),
});

export { setupSchema, insertSchema, updateSchema };
