
const request = require('request')
const forecast =(long, lat, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=b86e8d040c9c845fd36c26f6482430d9&query='+lat+','+long+'&units=f'
    // response ={body} below
    // url: url can be just url as it will inherit the name and value from the url we contructed
    request({url, json: true},(error,{body}) =>{
        if(error){
            callback('Unable to connect to weather services!', undefined)
        // destructured: response removed as we destrc. response to body
        }else if(body.error){
            callback('Unable to Find Location', undefined)
        }else{
            const curr_temp = body.current.temperature;
            const feels_like = body.current.feelslike;
            const weather_type = body.current.weather_descriptions[0];
            const msg = weather_type + '. Its currently '+curr_temp+ ' degrees out and it feels like '+ feels_like+' degrees';
            callback(undefined, msg)
        }
    })
}

module.exports = forecast ;
