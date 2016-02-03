var express = require('express');
var router = express.Router();
var weather = require('../models/weather.js');
var location = require('../models/location.js');
var city, country, description, wind, dayTemp, nightTemp, eveningTemp, morningTemp, maxTemp, minTemp;

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
            city = currentWeather.city.name;
            country = currentWeather.city.country;
            wind = currentWeather.list[0].speed;
            description = currentWeather.list[0].weather[0].description;

            //get temperatures
            dayTemp = currentWeather.list[0].temp.day;
            nightTemp = currentWeather.list[0].temp.night;
            eveningTemp = currentWeather.list[0].temp.eve;
            morningTemp = currentWeather.list[0].temp.morn;
            maxTemp = currentWeather.list[0].temp.max;
            minTemp = currentWeather.list[0].temp.min;

            res.render('weather-main', {
                title: 'Details',
                city: city,
                country: country,
                description: description,
                wind: wind,
                dayTemp: dayTemp,
                nightTemp: nightTemp,
                eveningTemp: eveningTemp,
                morningTemp: morningTemp,
                maxTemp: maxTemp,
                minTemp: minTemp
            });
        } catch (err) {
            console.log(err);
            res.redirect('/');
        }

    });
});


module.exports = router;
