const request = require("request"); 
const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=3d4835d0a0c387a9662b9fefd2176fd9&query='+address;
    
    
    request({ url, json: true }, (error, { body }) => {
        if(error){
            callback('Unable to connect...')
        }else if(body.data.length===0){
            callback('No data found!')
        }else{
           // console.log(body.data.length);
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude
            } )
        }
    } )
}
module.exports = geocode;
