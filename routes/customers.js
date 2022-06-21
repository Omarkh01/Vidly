const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const boolean = require('joi/lib/types/boolean');
const router = express.Router();

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 9,
        maxlength: 20
    }
})

const Customer = new mongoose.model('Customer', customerSchema);

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
})

router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let customer = new Customer({ 
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });
    customer = await customer.save();
    
    res.send(customer);
})

router.put('/:id', async (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true});
    if(!customer) return res.status(404).send('The customer with the given id was not found.');
    
    res.send(customer);
})

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    
    if(!customer) return res.status(404).send('The customer with the given id was not found.');
    
    res.send(customer);
})

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    
    if(!customer) return res.status(404).send('The customer with the given id was not found.');
    
    res.send(customer);
})

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required()
    }
    return Joi.validate(customer, schema);
}

module.exports = router;