const winston = require('winston');
const express = require('express');
const app = express();
const config = require('config');

console.log(config.get('jwtPrivateKey')); 

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server;
