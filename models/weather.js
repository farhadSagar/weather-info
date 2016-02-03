var request = require('request');

//exports the function whenever its called from other files!!
module.exports = function (location, callback) {
    var encodedLocation = encodeURIComponent(location);
    var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q='+encodedLocation+'&mode=json&units=imperial&cnt=7&appid=44db6a862fba0b067b1930da0d769e98';
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