const moment = require('moment');
const db = require('../models');
const Transaction = db.transaction;
const Wallet = db.wallet;
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

module.exports = {
    credit: async (userId, body) => {
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

        const transaction = await Transaction.create({
            user_id: userId,
            ...body,
            wallet_id: wallet.id,
            type: 'CREDIT',
            status: 'APPROVED',
        });

        return {
            status: 'success',
            data: transaction,
        };
    },

    debit: async (userId, body) => {
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

        if (user_credit_trxns[0].credits == null)
            return {
                status: 'failed',
                message: "You don't have money in your wallet",
            };

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

        if (
            user_debit_trxns[0].debits == null &&
            body.amount < user_credit_trxns[0].credits
        ) {
            const transaction = await Transaction.create({
                user_id: userId,
                ...body,
                wallet_id: wallet.id,
                type: 'DEBIT',
                status: 'APPROVED',
            });

            return {
                status: 'success',
                data: transaction,
            };
        } else if (
            user_debit_trxns[0].debits == null &&
            body.amount > user_credit_trxns[0].credits
        ) {
            return {
                status: 'failed',
                message: "You don't have enough money in your wallet",
            };
        }

        const balance =
            user_credit_trxns[0].credits - user_debit_trxns[0].debits;

        if (body.amount > balance)
            return {
                status: 'failed',
                message: "You don't have enough money in your wallet",
            };

        const transaction = await Transaction.create({
            user_id: userId,
            ...body,
            wallet_id: wallet.id,
            type: 'DEBIT',
            status: 'APPROVED',
        });

        return {
            status: 'success',
            data: transaction,
        };
    },

    inflow: async (userId) => {
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

        if (user_credit_trxns[0].credits === null)
            return {
                status: 'success',
                data: 0.0,
            };

        return {
            data: user_credit_trxns[0].credits,
            status: 'success',
        };
    },

    expenses: async (userId) => {
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

        if (user_debit_trxns[0].debits === null)
            return {
                status: 'success',
                data: 0.0,
            };

        return {
            data: user_debit_trxns[0].debits,
            status: 'success',
        };
    },
};
