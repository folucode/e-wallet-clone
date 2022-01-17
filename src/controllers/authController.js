const authService = require('../services/authService');
const {
    successResponse,
    errorResponse,
} = require('../helpers/responseHandler');

module.exports = {
    register: async (req, res) => {
        try {
            const { body } = req;
            const { status, message, data } = await authService.register(body);
            if (status === 'failed') return errorResponse(res, 400, message);

            return successResponse(res, 200, data, 'Sign Up Successful');
        } catch (error) {
            return errorResponse(res, 500, 'Something went wrong, ' + error);
        }
    },

    login: async (req, res) => {
        try {
            const { body } = req;
            const { status, message, data } = await authService.login(body);
            if (status === 'failed') return errorResponse(res, 400, message);

            return successResponse(res, 200, data, 'User successfully authenticated');
        } catch (error) {
            return errorResponse(res, 500, 'Something went wrong, ' + error);
        }
    },
};
