const { Rental, validate } = require('../models/rental');
const {Movie} = require('../models/rental');
const {Customer} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid genre..'); 

    let rental = new Rental({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    rental = await rental.save();
    res.send(rental);
})

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const rental = await Rental.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, {new: true});
    if(!rental) return res.status(404).send('The rental with the given id was not found..');

    res.send(rental);
})  

router.delete('/:id', async (req, res) => {
    const rental = await Rental.findByIdAndRemove(req.params.id);

    if(!rental) return res.status(404).send('The rental with the given id was not found..');
    
    res.send(rental);
})

module.exports = router;
