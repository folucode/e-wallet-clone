const Joi = require('joi');

const schema = {
    register: Joi.object().keys({
        full_name: Joi.string().required().min(3).max(30),
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
};

module.exports = schema;
