import Joi from "joi";

const webhookSchema = Joi.object({
  httpMethod: Joi.string().valid("POST", "PUT", "PATCH", "GET"),
  path: Joi.string(),
  callback: Joi.function(),
});

export { webhookSchema };
