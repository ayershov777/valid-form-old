const express = require('express');
const logger = require('morgan');

require('dotenv').config();
require('./config/database');

const app = express();
const port = process.env.PORT || 3001;

app.use(logger('dev'));
app.use(express.json());

app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/validation', require('./routes/validation'));

app.listen(port, () => console.log(`express server listening from port ${port}`));