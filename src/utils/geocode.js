
// in this case body is destructed from response as body is part of response
const request = require('request')
const geocode = (address, callback) =>{
    // We are passing the address through the encode uri componenet as it converts everything inside adress as something 
    // suitable for the url format even including the special cases
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYW5pbmRhMTMiLCJhIjoiY2tjZmZmeHczMDQybDJybDg2eGJmenRuYyJ9.up_WRCStRaNFm4-O0Kn-UQ&limit=1'
    // destructure: response = {body}
    // and short hand syntax right below for url
    // url: url can be just url as it will inherit the name and value from the url we contructed
    request({url, json: true}, (error, {body}) =>{
        if(error){
            callback('Unable to connect to location services!', undefined) // deafult js will send undefined regardless
         // Just body.features instead of response.body
        }else if(body.features.length === 0){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, {
                // Response removed
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = geocode;