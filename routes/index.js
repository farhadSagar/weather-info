var express = require('express');
var router = express.Router();
var weather = require ('../models/weather.js');
var location = require ('../models/location.js');
var city, temp, forecast;
/* GET home page. */
router.get('/', function(req, res, next) {
            res.render('index', { title: 'Home'});
});

module.exports = router;
