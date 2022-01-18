const {
    errorResponse,
    successResponse,
} = require('../helpers/responseHandler');
const transactionService = require('../services/transactionService');

module.exports = {
    credit: async (req, res) => {
        try {
            const userId = req.user.id;
            const { body } = req;

            const { status, message, data } = await transactionService.credit(userId, body);
            if (status === 'failed') return errorResponse(res, 400, message);

            return successResponse(res, 201, data, 'Wallet successfully credited');
        } catch (error) {
            return errorResponse(
                res,
                500,
                `Something went wrong ${error.message}`
            );
        }
    },

    debit: async (req, res) => {
        try {
            const userId = req.user.id;
            const { body } = req;

            const { status, message, data } = await transactionService.debit(userId, body);
            if (status === 'failed') return errorResponse(res, 400, message);

            return successResponse(res, 201, data, 'Wallet successfully credited');
        } catch (error) {
            return errorResponse(res, 500, `Something went wrong ${error.message}`)
        }
    }
};
