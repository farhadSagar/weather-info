var express = require('express');
var router = express.Router();
var weather = require('../models/weather.js');
var location = require('../models/location.js');
var city, temp, forecast;

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/*-- Post from index page to weather-page.jade page --*/
router.post('/weather-post', function (req, res, next) {
    console.log(req.body.cityName);
    console.log('Now redirect');

    //callback functions to fetch weather info
    weather(req.body.cityName, function (currentWeather) {
        try {
            city = currentWeather.name;
            temp = currentWeather.main.temp;
            forecast = currentWeather.weather[0].main;
            res.render('weather-main', { title: 'Temperature', city: city, temp: temp});
        } catch (err) {
            console.log(err);
            res.redirect('/');
        }
    });
});


module.exports = router;
