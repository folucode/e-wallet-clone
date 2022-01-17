const { errorResponse } = require('../helpers/responseHandler');

const validation = (schema, property) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        const valid = error == null;

        if (valid) {
            next();
        } else {
            const { details } = error;
            const message = details.map((i) => i.message).join(',');

            errorResponse(res, 422, message);
        }
    };
};

module.exports = validation;
