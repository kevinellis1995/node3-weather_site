const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/90d4cf279d8cc4a2ebe540480949b23e/' + encodeURIComponent(lat) + ',' + encodeURIComponent(long);

    request({url: url, json:true}, (err,{body})=>{
        err ? callback('cant connect', undefined):
        body.error ? callback(body.error, undefined):
        callback(undefined, {
            title: body.currently.summary,
            temp: 'Tempurature: '+ body.currently.temperature + '.',
            precip: 'Precipitation: '+ body.currently.precipProbability+'% chance'
        })
    })
}


module.exports = forecast;
