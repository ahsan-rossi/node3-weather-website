const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config.
const publicDir = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res) =>{
    res.render('index',{
        title:'Weather',
        name:'Ahsan Rossi'
    });
}) 

app.get('/about', (req, res) =>{
    res.render('about',{
        title:'About me...',
        name:'Ahsan Rossi'
    });
})

app.get('/help', (req, res) =>{
    res.render('help',{
        title:'Help Page',
        message:'This is a help page...',
        name:'Ahsan Rossi'
    });
})


app.get('/weather', (req, res)=> {

    const location = req.query.address
    if(!location){
        return res.send({
            error: 'Location need to provide!'
        })
    } 

    geocode(location, (error, {latitude, longitude} ={}) => {
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, output) => {
            if(error){
                return res.send({
                    error: error
                })
            }           
            if(output){

                const temp = parseInt(output.main.temp)-273;
                res.send({
                    forecast: 'It\'s '+output.weather[0].description+' with '+temp+' degree temparature',
                    location: location
            
                });
            }
        })
        
    })

   
})
//app.com
//app.com/help
//app.com/about

app.get('/help/*',(req, res) => {
    res.render('404',{
        title:'404',
        error:'Error 404. No help found!',
        name:'Ahsan Rossi'
    });
})


app.get('*',(req, res) => {
    res.render('404',{
        title:'404',
        error:'Error 404. No page found!',
        name:'Ahsan Rossi'
    });
})

app.listen(port, () => {
    console.log('Server is running on port'+port+' .')
}) 