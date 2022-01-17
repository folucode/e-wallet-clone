module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'myMySQL1234!@#$',
    DB: 'fundall',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};
