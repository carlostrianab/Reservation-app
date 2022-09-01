const mongoose = require('mongoose');
const {Schema} = mongoose;


// Creating a reservation schema that will set the structure of how reservations will be saved in the database 
const reservationSchema = new Schema({
    userID: {type: Number, required: true},
    date:{type:String, required: true}
});

module.exports = mongoose.model('reservation', reservationSchema);