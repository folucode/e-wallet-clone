module.exports = (sequelize, Sequelize) => {
    const Wallet = sequelize.define('wallet', {
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        currency: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });

    return Wallet;
};
