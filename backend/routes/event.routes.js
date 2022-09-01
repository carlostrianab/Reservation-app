const express = require('express');
const router = express.Router();
const Event = require('../models/events');

// Confirms connection with the DB and shows all reservations made 
router.get('/', async (req, res) => {
    const event = await Event.find();
    res.json(event)
 });

//Creates a new reservation
router.post('/', async (req,res) => {
    const {name, type, location, address, ratings, photo, reservations} = req.body;
    const event = new Event({name, type, location, address, ratings, photo, reservations});
    await event.save();
    res.json({'status':'event saved'})
});

module.exports = router;