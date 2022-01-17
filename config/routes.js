const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    return res.json({
        status: 'success',
        message: 'We\'re good to go!',
    });
});

module.exports = router;
