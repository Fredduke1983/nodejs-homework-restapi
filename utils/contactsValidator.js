const Joi = require("joi");

exports.contactsValidate = data =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(3).max(20).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      phone: Joi.string()
        .pattern(/^[(,),0-9]{5,12}$/)
        .required(),
    })
    .validate(data);
exports.contactFavValidate = data =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      favorite: Joi.bool().required(),
    })
    .validate(data);
