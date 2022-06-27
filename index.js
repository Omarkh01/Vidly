require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const error = require('./middleware/error');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const genres = require('./routes/genres')
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const app = express();
const mongoose = require('mongoose');
    
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'uncaughtExceptions.log' }),
    ],
    rejectionHandlers:[
        new winston.transports.File({ filename: 'uncaughtRejections.log' }),
    ],
    exitOnError: false 
}) 

winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/vidly'}));

throw new Error('Something failed during startup');
// const p = Promise.reject(new Error('Something failed miserably!'));
// p.then(() => console.log('Yes'));

if(!config.get('jwtPrivateKey')){
    console.log('FATAL ERROR');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);

app.listen(3000, () => console.log('Listening on port 3000...'));


