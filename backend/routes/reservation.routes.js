const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservations')

// Confirms connection with the DB and shows all reservations made 
router.get('/', async (req, res) => {
   const reservation = await Reservation.find();
   console.log(req.body)
   res.json(reservation)
});

//Gets a single reservation based on the id 
router.get('/:id', async(req,res) => {
    const reservation = await Reservation.findById(req.params.id);
    console.log(reservation);
    res.json('received');
})

//Creates a new reservation
router.post('/', async (req,res) => {
    const {userID, date} = req.body;
    const reservation = new Reservation({userID, date});
    await reservation.save();
    res.json({'status':'reservation saved'})
});

//Updates an existing reservation using its id 
router.put('/:id', async (req,res) => {
    const {userID, date} = req.body;
    const newReservation = {userID, date};
    await Reservation.findByIdAndUpdate(req.params.id, newReservation);
    res.json({'status':'reservation updated'})
});

// Deletes a reservation using its id 
router.delete('/:id', async(req, res) => {
    await Reservation.findByIdAndRemove(req.params.id);
    res.json({'status':'reservation deleted'})
})



module.exports = router;