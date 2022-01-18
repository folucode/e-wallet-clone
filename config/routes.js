const express = require('express');
const authController = require('../src/controllers/authController');
const transactionController = require('../src/controllers/transactionController');
const walletController = require('../src/controllers/walletController');
const validation = require('../src/middlewares/validation');
const verifyUserToken = require('../src/middlewares/verifyUserToken');
const schema = require('./validationSchema');

const router = express.Router();

router.get('/', (req, res) => {
    return res.json({
        status: 'success',
        message: "We're good to go!",
    });
});

// Authentication
router.post('/auth/register', validation(schema.register), authController.register);
router.post('/auth/login', validation(schema.login), authController.login);

// Wallet
router.post('/wallet', verifyUserToken, walletController.create);
router.get('/wallet/balance', verifyUserToken, walletController.balance);

// Transaction
router.post('/transaction/credit', verifyUserToken, validation(schema.creditTransaction), transactionController.credit);
router.post('/transaction/debit', verifyUserToken, validation(schema.debitTransaction), transactionController.debit);
router.get('/transaction/inflow', verifyUserToken, transactionController.inflow);
router.get('/transaction/expenses', verifyUserToken, transactionController.expenses);

module.exports = router;
