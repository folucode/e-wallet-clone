const db = require('../models');
const User = db.user;

const {
    hashPassword,
    generateFreshUserTokens,
    comparePassword,
} = require('../helpers/auth');

module.exports = {
    register: async (body) => {
        const { first_name, last_name, phone, email, password } = body;

        const user = await User.create({
            first_name,
            last_name,
            phone,
            email: email.toLowerCase(),
            password: hashPassword(password),
        });

        const payload = {
            id: user.id,
            username: user.full_name,
            email: user.email,
        };

        const accessToken = await generateFreshUserTokens(payload);

        return {
            status: 'success',
            data: { accessToken, user },
        };
    },

    login: async (body) => {
        const { email, password } = body;

        const user = await User.findOne({
            where: { email },
        });

        if (user.length < 1) {
            return {
                status: 'failed',
                message: 'invalid user credentials',
            };
        }

        const result = comparePassword(password, user[0].password);
        if (!result) {
            return {
                status: 'failed',
                message: 'invalid user credentials',
            };
        }

        const payload = {
            id: user[0].id,
            username: user[0].full_name,
            email: user[0].email,
        };

        const accessToken = await generateFreshUserTokens(payload);
        return {
            status: 'success',
            data: { accessToken, user },
        };
    },
};
