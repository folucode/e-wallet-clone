const { generateWalletAddress } = require('../helpers/wallet');
const db = require('../models');
const Wallet = db.wallet;
const Transaction = db.transaction;
const sequelize = db.sequelize;

module.exports = {
    create: async (userId) => {
        const walletAddress = generateWalletAddress();

        const wallet = await Wallet.create({
            user_id: userId,
            address: walletAddress,
            currency: 'NGN',
        });

        return {
            data: wallet,
            status: 'success',
        };
    },

    balance: async (userId) => {
        const wallet = await Wallet.findOne({
            where: {
                user_id: userId,
            },
        });

        if (wallet.length < 1) {
            return {
                status: 'failed',
                message: "You don't have a wallet",
            };
        }

        const wallet_balance = await Transaction.findAll({
            where: {
                user_id: userId,
                wallet_id: wallet.id,
                type: 'CREDIT',
            },
            attributes: [
                [sequelize.fn('sum', sequelize.col('amount')), 'balance'],
            ],
            raw: true,
        });

        if (wallet_balance[0].balance === null)
            return {
                status: 'success',
                data: 0.0,
            };

        return {
            data: wallet_balance[0].balance,
            status: 'success',
        };
    },
};
