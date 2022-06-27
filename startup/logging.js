const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function (){
    const logger = winston.createLogger({
        transports: [
            new winston.transports.Console(),
        ],
        exceptionHandlers: [
            new winston.transports.File({ filename: 'uncaughtExceptions.log' }),
        ],
        rejectionHandlers:[
            new winston.transports.File({ filename: 'uncaughtRejections.log' }),
        ]
    })
    
    winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/vidly'}));
}