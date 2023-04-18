import Joi from "joi";

const updateSchema = Joi.object({
  table: Joi.string().required(),
  set: Joi.object().required(),
  where: Joi.string().required(),
});

export { updateSchema };
