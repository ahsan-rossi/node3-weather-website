const request = require("request"); 
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=f5c2f4cd770ffa7c7365c472518d1176';
    request({ url, json: true }, (error, {body}) => {
        if(error){
            callback('Unable to connect...')
        }else if(body.cod === '400'){
            callback('No data found!')
        }else{
            callback(undefined, body )
        }
    } )
}
module.exports = forecast;
