const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');
require('dotenv').config();

module.exports = function() {
    const db = config.get('db');
    if(process.env.STATUS === 'production' ) {
        mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('Connected to production DATABASE...')); 
    }

    else {
        mongoose.connect(db)
        .then(() => console.log(`Connected to ${db}...`));
    }
}
