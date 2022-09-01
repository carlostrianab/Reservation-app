const express = require('express');
const router = express.Router();
const User = require('../models/users');

// Confirms connection with the DB and shows all reservations made 
router.get('/', async (req, res) => {
    const user = await User.find();
    console.log(user);
    res.json('received')
 });

 //Creates a new user
router.post('/', async (req,res) => {
    const {name, email , preferences, reservations} = req.body;
    const user = new User({name, email , preferences, reservations});
    await user.save();
    res.json({'status':'new user saved'})
});

//Updates an existing user using its id 
router.put('/:id', async (req,res) => {
    const {name, email , preferences, reservations} = req.body;
    const newUser = {name, email , preferences, reservations};
    await User.findByIdAndUpdate(req.params.id, newUser);
    res.json({'status':'user updated'})
});

//Deletes an existing user using its id
router.delete('/:id', async(req, res) => {
    await User.findByIdAndRemove(req.params.id);
    res.json({'status':'user deleted'})
})
 

 module.exports = router;