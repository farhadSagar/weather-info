# weather-info
A simple way to fetch user's current weather using user's ip address. It first get IP address of the user using the url "http://ipinfo.io". It uses the current city of the user from his IP address and generate the weather of that city from openweathermap.

## npm module request:
```
sudo npm install -g require
```

### Step1: Fetching user's Current City through his IP 
ipinfo.io will let us fetch a json formated details of the current user. Json formate is saved in the body here. we can fetch the city here by calling body.city
```node
var request = require('request');

var url = 'http://ipinfo.io';

module.exports = function (callback){
    request({
        url: url,
        json: true
    }, function (error, response, body){
        if(error){
            callback('Something went wrong');
        }else{
            callback(body);
        }
    });
};
```

### Step2: Fetch current weather from city
We pass the current city (encoded location) to the url of openweathermap. Here again we get a json formatted data. For London city we will get: 
```json
{"coord":{"lon":-0.13,"lat":51.51},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02n"}],"base":"cmc stations","main":{"temp":51.1,"pressure":1009,"humidity":66,"temp_min":47.3,"temp_max":53.96},"wind":{"speed":17.71,"deg":250},"clouds":{"all":20},"dt":1453919775,"sys":{"type":1,"id":5091,"message":0.0127,"country":"GB","sunrise":1453880751,"sunset":1453912882},"id":2643743,"name":"London","cod":200}
```

We can access the current temperature of london by calling body.main.temp
```node
var request = require('request');

module.exports = function (location, callback) {
    var encodedLocation = encodeURIComponent(location);
    var url = 'http://api.openweathermap.org/data/2.5/weather?q='+encodedLocation+'&appid=44db6a862fba0b067b1930da0d769e98&units=imperial';
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (error) {
            callback('Something went wrong');
        } else {
            callback(body);
        }
    });
};
```

### Step3: Call the modules in your route:
We pass the city, temperature and other details through currentWeather.name, currentWeather.main.temp and so on....
```node
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
```
