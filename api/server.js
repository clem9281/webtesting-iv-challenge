const express = require('express');
const helmet = require('helmet');
const register = require('../routes/register');

const app = express();

app.use(helmet());
app.use(express.json());
app.use('/api/register', register);

app.get('/', (req, res) => res.send('<h1>WebTesting IV</h1>'))

module.exports = app;