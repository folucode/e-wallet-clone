module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define('transaction', {
        full_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });

    return Transaction;
};
