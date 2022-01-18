module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define('transaction', {
        wallet_id: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        amount: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        tag: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        reason: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        type: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
            default: 'PENDING',
        },
        merchant: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    });

    return Transaction;
};
