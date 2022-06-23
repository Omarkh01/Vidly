const express = require('express');
const genres = require('./routes/genres')
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);

app.listen(3000, () => console.log('Listening on port 3000...'));


