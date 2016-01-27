var express = require('express');
var router = express.Router();
var weather = require ('../models/weather.js');
var location = require ('../models/location.js');
var city, temp, forecast;
/* GET home page. */
router.get('/', function(req, res, next) {
    location(function (currentLocation){
        weather(currentLocation.city, function (currentWeather){
            city = currentWeather.name;
            temp = currentWeather.main.temp;
            forecast = currentWeather.weather[0].main;
            res.render('index', { title: 'Home', city: city, temp: temp, forecast: forecast});
        });
    });
});

module.exports = router;
