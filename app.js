const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const routes = require('./config/routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/v1/', routes);
app.use((req, res) => {
    return res.status(404).json({ success: false, message: 'Not found' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
