const { errorResponse, successResponse } = require('../helpers/responseHandler');
const walletService = require('../services/walletService');

module.exports = {
    create: async (req, res) => {
        try {
            const userId = req.user.id;
            const { message, status, data } = await walletService.create(userId);
            if(status === 'failed')
                return errorResponse(res, 500, message);

            return successResponse(res, 201, data, 'Wallet created successfully');
        } catch (error) {
            return errorResponse(
                res,
                500,
                'Something went wrong, ' + error.message
            );
        }
    },

    balance: async (req, res) => {
        try {
            const userId = req.user.id;
            const { message, status, data } = await walletService.balance(userId);
            if(status === 'failed')
                return errorResponse(res, 500, message);

            return successResponse(res, 200, data, 'Wallet balance successfully fetched');
        } catch (error) {
            return errorResponse(
                res,
                500,
                'Something went wrong, ' + error.message
            );
        }
    },
};
