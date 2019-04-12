const express = require('express');
const helmet = require('helmet');
const register = require('../routes/register');
const users = require('../routes/users');

const app = express();

app.use(helmet());
app.use(express.json());
app.use('/api/register', register);
app.use('/api/users', users);

app.get('/', (req, res) => res.send('<h1>WebTesting IV</h1>'))

module.exports = app;