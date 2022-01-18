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

        const user_credit_trxns = await Transaction.findAll({
            where: {
                user_id: userId,
                wallet_id: wallet.id,
                type: 'CREDIT',
                status: 'APPROVED',
            },
            attributes: [
                [sequelize.fn('sum', sequelize.col('amount')), 'credits'],
            ],
            raw: true,
        });

        const user_debit_trxns = await Transaction.findAll({
            where: {
                user_id: userId,
                wallet_id: wallet.id,
                type: 'DEBIT',
                status: 'APPROVED',
            },
            attributes: [
                [sequelize.fn('sum', sequelize.col('amount')), 'debits'],
            ],
            raw: true,
        });

        const balance =
            user_credit_trxns[0].credits - user_debit_trxns[0].debits;

        if (user_credit_trxns[0].credits === null)
            return {
                status: 'success',
                data: 0.0,
            };

        if (user_debit_trxns[0].debits === null)
            return {
                status: 'success',
                data: user_credit_trxns[0].credits,
            };

        return {
            data: balance,
            status: 'success',
        };
    },
};
