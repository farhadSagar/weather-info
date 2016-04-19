var request = require('request');

//exports the function whenever its called from other files!!
module.exports = function (location, callback) {
    var encodedLocation = encodeURIComponent(location);
    var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q='+encodedLocation+'&mode=json&units=imperial&cnt=7&appid=aedb5948152d86c99c9976709adee2fc';
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