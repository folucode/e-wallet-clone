const express = require('express');
const authController = require('../src/controllers/authController');
const validation = require('../src/middlewares/validation');
const schema = require('./validationSchema');

const router = express.Router();

router.get('/', (req, res) => {
    return res.json({
        status: 'success',
        message: "We're good to go!",
    });
});

router.post('/auth/register', validation(schema.register), authController.register);
router.post('/auth/login', validation(schema.login), authController.login);


module.exports = router;
