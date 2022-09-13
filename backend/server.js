/**
 * @format
 */

//import {AppRegistry} from 'react-native';
//import App from '../App';
//import {name as appName} from '../app.json';


//AppRegistry.registerComponent(appName, () => App);

const express = require('express');
const morgan = require('morgan');
const app = express();
const {mongoose} = require('./database')



const path = require('path')

// SERVER SETTINGS 
//Port settings: default port number given by cloud service or port number 3000
app.set('port', process.env.PORT || 3000);

//MIDLEWARE 
//shows information in the console about request made by the client 
app.use(morgan('dev'));
//verifies that incoming data is in json format to afterwards use that code in the server 
app.use(express.json());

//DATABASE ROUTES
app.use('/DB/reservations', require('./routes/reservation.routes'));
app.use('/DB/users', require('./routes/user.routes'));
app.use('/DB/events', require('./routes/event.routes'));


//FORK API

const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://the-fork-the-spoon.p.rapidapi.com/restaurants/v2/list',
  params: {queryPlaceValueCityId: '348156', pageSize: '10', pageNumber: '1'},
  headers: {
    'X-RapidAPI-Key': 'ba0701cfb7mshd9eb2940650ee51p1bda20jsn31d37b5357ff',
    'X-RapidAPI-Host': 'the-fork-the-spoon.p.rapidapi.com'
  }
};

app.get('/fork', async (req, res) => {
    axios.request(options).then(async function (response) {
        const data = await response;
        res.json(data.data.data[0])
        
    }).catch(function (error) {
        console.error(error);
    });
    
 });


//STATIC FILES 
app.use(express.static('../frontend/index.js'));
app.use('/static', express.static('../frontend/public'))

//STARTING THE SERVER 
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`)
});
