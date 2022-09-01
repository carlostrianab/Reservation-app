const mongoose = require('mongoose');
const {Schema} = mongoose;


// Creating a reservation schema that will set the structure of how reservations will be saved in the database 
const userRegistrationSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    preferences:{type:Array, required: false},
    reservations:{type:Array, required: false}
});

module.exports = mongoose.model('user', userRegistrationSchema);