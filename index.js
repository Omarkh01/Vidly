const winston = require('winston');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const config = require('config');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

const uri = config.get('db');
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("production").collection("devices");
 // perform actions on the collection object
  client.close();
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;
