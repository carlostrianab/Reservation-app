const mongoose = require('mongoose');
const {Schema} = mongoose;


// Creating a reservation schema that will set the structure of how reservations will be saved in the database 
const eventSchema = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    location: {type: Object, required:true},
    address: {type: Object, required: true},
    ratings: {type: Object, required: true},
    photo: {type: String, required: true},
    reservations: {type: Object, required: true}

});

module.exports = mongoose.model('event', eventSchema);