const request = require('request');

const geocode = (address, callback) =>{
    const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + 
    '.json?access_token=pk.eyJ1IjoiaWFtY2hlZXNlIiwiYSI6ImNrN3hoM3V0cjBjejUzZW85cGhzdWV6aTQifQ.l6W8tfQrUE6yxHfwL2a8Rg&limit=1'

    request({url: url2, json:true}, (err,{body})=>{
        err ? callback('Unable To Connect', undefined):
        body.features.length === 0? callback('Cant Find Location', undefined):
        callback(undefined, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
        })
    })

}


module.exports= geocode