import Joi from "joi";

const setupSchema = Joi.object({
  from: Joi.string().required(),
  to: Joi.string().required(),
  subject: Joi.string(),
  text: Joi.string().required().optional(),
  html: Joi.string().required().optional(),
});

export { setupSchema };
