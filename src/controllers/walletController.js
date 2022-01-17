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
};
