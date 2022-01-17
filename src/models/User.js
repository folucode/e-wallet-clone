module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
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

    return User;
};
