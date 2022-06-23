const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genre');

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
        minlength: 5
    }, 
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        minlength: 0,
        maxlength: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        minlength: 0,
        maxlength: 255
    }
}))

function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(5).max(50),
        genreId: Joi.string(),
        numberInStock: Joi.number().min(0),
        dailyRentalRate: Joi.number().min(0) 
    }
    return(Joi.validate(movie, schema));
}

exports.Movie = Movie;
exports.validate = validateMovie;

