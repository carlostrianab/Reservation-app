const mongoose = require('mongoose');
const URI = 'mongodb://localhost:27017'

// CONNECT TO THE DATABASE URI 
mongoose.connect(URI)   
        .then(db => console.log('DB is connnected'))
        .catch(err => console.log(err))

module.exports = mongoose