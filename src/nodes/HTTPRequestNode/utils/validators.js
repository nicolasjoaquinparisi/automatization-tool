import Joi from "joi";

const headersSchema = Joi.object({
  "Content-Type": Joi.string(),
  Authorization: Joi.string(),
  "Access-Control-Allow-Origin": Joi.string().uri().allow("*").required(),
  "Access-Control-Allow-Headers": Joi.string()
    .valid("Content-Type", "Authorization")
    .required(),
}).unknown();

const httpRequestSchema = Joi.object({
  url: Joi.string().uri().required(),
  method: Joi.string()
    .valid("GET", "POST", "PUT", "PATCH", "DELETE")
    .required(),
  body: Joi.any(),
  headers: headersSchema,
});

export { httpRequestSchema };
