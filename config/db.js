module.exports = {
    HOST: 'us-cdbr-east-05.cleardb.net',
    USER: 'b07acaeb20ea6a',
    PASSWORD: '25c82393',
    DB: 'heroku_c68f8c8c1485bd7',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};
