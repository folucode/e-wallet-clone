const Joi = require('joi');

const schema = {
    register: Joi.object().keys({
        first_name: Joi.string().required().min(3).max(30),
        last_name: Joi.string().required().min(3).max(30),
        phone: Joi.number().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),
        repeat_password: Joi.ref('password'),
        email: Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] },
        }),
    }),

    login: Joi.object().keys({
        email: Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] },
        }),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),
    }),

    creditTransaction: Joi.object().keys({
        amount: Joi.number().required(),
        tag: Joi.string().required(),
    }),

    debitTransaction: Joi.object().keys({
        amount: Joi.number().required(),
        tag: Joi.string().required(),
        reason: Joi.string().required(),
        merchant: Joi.string().required(),
    }),
};

module.exports = schema;
