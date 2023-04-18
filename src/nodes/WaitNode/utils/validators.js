import Joi from "joi";

const waitNodeSchema = Joi.object({
  resume: Joi.string()
    .valid("After time interval", "At specified time")
    .required(),
  waitUnit: Joi.string()
    .valid("milliseconds", "seconds", "minutes", "hours")
    .when("resume", {
      is: "After time interval",
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    }),
  waitAmount: Joi.number().integer().positive().when("resume", {
    is: "After time interval",
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
  dateAndTime: Joi.date().when("resume", {
    is: "At specified time",
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
});

export { waitNodeSchema };
