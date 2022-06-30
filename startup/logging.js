const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function (){
    const logger = winston.createLogger({
        exceptionHandlers: [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.json()
                )
            }),
            new winston.transports.File({ filename: 'uncaughtExceptions.log' }),
        ],
        rejectionHandlers:[
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.json()
                )
            }),
            new winston.transports.File({ filename: 'uncaughtRejections.log' }),
        ], 
        exitOnError: true,
    })
    
    winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/vidly'}));
}