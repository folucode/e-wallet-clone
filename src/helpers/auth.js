const { hashSync, compareSync } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { config } = require('dotenv');

config();


const createToken = (payload, duration) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: duration });
};

const hashPassword = (password) => {
    return hashSync(password, 10);
};

const comparePassword = (password, hashedPassword) => {
    return compareSync(password, hashedPassword);
};

const generateFreshUserTokens = async (user) => {
    const tokenExpiryInSeconds = parseInt(process.env.JWT_TOKEN_EXPIRY_IN_SECONDS, 10);
    const tokenExpiresAt = new Date(new Date().getTime() + 1000 * tokenExpiryInSeconds);
    const accessToken = createToken({ ...user, tokenExpiresAt }, tokenExpiryInSeconds);

    return accessToken;
};

module.exports = {
    hashPassword,
    comparePassword,
    generateFreshUserTokens
};
