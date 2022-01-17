const { generateWalletAddress } = require('../helpers/wallet');
const db = require('../models');
const Wallet = db.wallet;

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
};
